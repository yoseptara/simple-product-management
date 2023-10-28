import { z } from "zod";
import { httpApi } from "./http.api";
import { camelize } from "@src/utils/camelize";

const VariantSchema = z
  .object({
    id: z.number(),
    product_id: z.number(),
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
    created_at: z.date(),
    updated_at: z.date(),
  })
  .transform(camelize);

const VariantListSchema = z.array(VariantSchema);
type VariantList = z.output<typeof VariantListSchema>;

export async function getVariants(productId: number): Promise<VariantList> {
  return httpApi
    .get("/products/" + productId + "/variants")
    .then(({ data }) => VariantListSchema.parse(data));
}
