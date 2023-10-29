import { Product, getProduct } from "@src/api/products.api";
import { BaseCard } from "@src/components/common/BaseCard/BaseCard";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./ProductDetail.styles";

import { ImageCollections } from "./image-collections/ImageCollections";

import { BaseButton } from "@src/components/common/BaseButton/BaseButton";
import { CREATE_VARIANT_PATH } from "@src/components/router/AppRouter";

const ProductDetail: React.FC = () => {
  const navigate = useNavigate();

  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    getProduct(Number(productId)).then((product) => setProduct(product));
  }, [productId]);

  return (
    <BaseCard
      id="editable-table"
      title={product?.name}
      padding="1.25rem 1.25rem 0"
    >
      <S.Description>{product?.description}</S.Description>
      <S.StyledBaseCol span={24}>
        <ImageCollections images={product?.images ?? []} />
      </S.StyledBaseCol>

      <S.StyledEditableVariantTable productId={Number(productId)} />

      <BaseButton
        type="primary"
        onClick={() => {
          navigate(`/${productId}${CREATE_VARIANT_PATH}`);
        }}
      >
        Create Variant
      </BaseButton>
    </BaseCard>
  );
};

export default ProductDetail;
