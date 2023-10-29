import { z } from "zod";
import { httpApi } from "./http.api";
import { camelize } from "@src/utils/camelize";

const VariantSchema = z
  .object({
    id: z.number(),
    product_id: z.number().optional().nullable(),
    name: z.string(),
    size: z.string().optional(),
    color: z.string().optional(),
    images: z
      .array(
        z
          .object({
            id: z.number(),
            url: z.string(),
          })
          .transform(camelize)
      )
      .optional(),
    created_at: z.string().transform((arg) => new Date(arg)),
    updated_at: z

      .string()
      .optional()
      .nullable()
      .transform((arg) => (arg ? new Date(arg) : null)),
  })
  .transform(camelize);

export const VariantListSchema = z.array(VariantSchema);

export type Variant = z.output<typeof VariantSchema>;
export type VariantList = z.output<typeof VariantListSchema>;

export async function getVariants({
  productId,
  page,
  pageSize,
}: {
  productId: number;
  page: number;
  pageSize: number;
}): Promise<{ variants: VariantList; total: number }> {
  const params = { page, pageSize };
  return httpApi
    .get("/products/" + productId + "/variants/", { params })
    .then(({ data }) => {
      const variants = VariantListSchema.parse(data.variants);
      const total = data.total;
      return { variants, total };
    });
}

export async function getVariant(
  id: number,
  productId: number
): Promise<Variant> {
  return httpApi
    .get("/products/" + productId + "/variants/" + id)
    .then(({ data }) => {
      return VariantSchema.parse(data);
    });
}

export async function createVariant({
  productId,
  name,
  size,
  color,
  imageUrls,
}: {
  productId: number;
  name: string;
  size?: string;
  color?: string;
  imageUrls?: string[];
}): Promise<void> {
  return httpApi.post("/products/" + productId + "/variants/", {
    product_id: productId,
    name,
    size,
    color,
    image_urls: imageUrls,
  });
}

export async function updateVariant({
  id,
  productId,
  name,
  size,
  color,
  newImageUrls,
  deletedImageIds,
}: {
  id: number;
  productId: number;
  name: string;
  size?: string;
  color?: string;
  newImageUrls?: string[];
  deletedImageIds?: number[];
}): Promise<void> {
  return httpApi.post("/products/" + productId + "/variants/" + id, {
    product_id: productId,
    name,
    size,
    color,
    image_urls: newImageUrls,
    deleted_image_ids: deletedImageIds,
  });
}
