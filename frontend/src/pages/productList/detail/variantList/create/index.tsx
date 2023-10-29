import React, { useState, useEffect } from "react";
import { Form } from "antd";
import { useParams } from "react-router-dom";
import { CreateOrUpdateVariantForm } from "../../CreateOrUpdateVariantForm/CreateOrUpdateVariantForm";
import { Variant, getVariant } from "@src/api/variants.api";

const VariantForm: React.FC = () => {
  const [form] = Form.useForm();
  const { productId, variantId } = useParams<{
    productId: string;
    variantId: string;
  }>();
  const [variant, setVariant] = useState<Variant>();

  useEffect(() => {
    if (variantId) {
      getVariant(Number(variantId), Number(productId)).then((variant) =>
        setVariant(variant)
      );
    }
  }, [variantId, form]);

  return (
    <CreateOrUpdateVariantForm
      productId={Number(productId)}
      variant={variant}
    />
  );
};

export default VariantForm;
