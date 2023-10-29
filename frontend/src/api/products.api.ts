import { z } from "zod";
import { httpApi } from "./http.api";
import { camelize } from "@src/utils/camelize";
import { VariantListSchema } from "./variants.api";

const ProductSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    description: z.string().optional(),
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
    variants: VariantListSchema.optional().nullable(),
    logo: z
      .object({
        id: z.number(),
        url: z.string(),
      })
      .transform(camelize)
      .optional(),
    created_at: z.string().transform((arg) => new Date(arg)),
    updated_at: z
      .string()
      .optional()
      .nullable()
      .transform((arg) => (arg ? new Date(arg) : null)),
  })
  .transform(camelize);

const ProductListSchema = z.array(ProductSchema);

export type Product = z.output<typeof ProductSchema>;
export type ProductList = z.output<typeof ProductListSchema>;

export async function getProducts(
  page: number,
  pageSize: number
): Promise<{ products: ProductList; total: number }> {
  const params = { page, pageSize };
  return httpApi.get("/products/", { params }).then(({ data }) => {
    const products = ProductListSchema.parse(data.products);
    const total = data.total;
    return { products, total };
  });
}

export async function getProduct(id: number): Promise<Product> {
  return httpApi.get("/products/" + id).then(({ data }) => {
    return ProductSchema.parse(data);
  });
}

export async function createProduct({
  name,
  description,
  logoUrl,
  imageUrls,
}: {
  name: string;
  description?: string;
  logoUrl?: string;
  imageUrls?: string[];
}): Promise<void> {
  return httpApi.post("/products/", {
    name,
    description,
    logo_url: logoUrl,
    image_urls: imageUrls,
  });
}

export async function updateProduct({
  id,
  name,
  description,
  logoUrl,
  newImageUrls,
  deletedImageIds,
}: {
  id: number;
  name?: string;
  description?: string;
  logoUrl?: string;
  newImageUrls?: string[];
  deletedImageIds?: number[];
}): Promise<void> {
  return httpApi.put("/products/" + id, {
    name,
    description,
    logo_url: logoUrl,
    image_urls: newImageUrls,
    deleted_image_ids: deletedImageIds,
  });
}
