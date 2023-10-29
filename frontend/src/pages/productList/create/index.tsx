import React, { useState, useEffect } from "react";
import { Form } from "antd";
import { useParams } from "react-router-dom";
import { CreateOrUpdateProductForm } from "@src/pages/productList/CreateOrUpdateProductForm/CreateOrUpdateProductForm";
import { Product, getProduct } from "@src/api/products.api";

const ProductForm: React.FC = () => {
  const [form] = Form.useForm();
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    if (productId) {
      getProduct(Number(productId)).then((product) => setProduct(product));
    }
  }, [productId, form]);

  return <CreateOrUpdateProductForm product={product} />;
};

export default ProductForm;
