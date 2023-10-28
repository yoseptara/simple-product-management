import { z } from "zod";
import { httpApi } from "./http.api";
import { camelize } from "@src/utils/camelize";

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
    logo_id: z.number().optional(),
    created_at: z.date(),
    updated_at: z.date(),
  })
  .transform(camelize);

const ProductListSchema = z.array(ProductSchema);
export type ProductList = z.output<typeof ProductListSchema>;

export async function getProducts(
  page: number,
  pageSize: number
): Promise<{ products: ProductList; total: number }> {
  const params = { page, pageSize };
  return httpApi.get("/products", { params }).then(({ data }) => {
    const products = ProductListSchema.parse(data.products);
    const total = data.total;
    return { products, total };
  });
}
