import React from "react";
import { EditableTable } from "@src/components/tables/productTable/EditableProductTable";
import * as S from "@src/components/tables/Tables/Tables.styles";
import { BaseButton } from "@src/components/common/BaseButton/BaseButton";
import { useNavigate } from "react-router-dom";
import { CREATE_PRODUCT_PATH } from "@src/components/router/AppRouter";

const ProductDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <S.TablesWrapper>
        <S.Card
          id="editable-table"
          title="Products Dashboard"
          padding="1.25rem 1.25rem 0"
        >
          <EditableTable />
          <BaseButton
            type="primary"
            onClick={() => {
              navigate(CREATE_PRODUCT_PATH);
            }}
          >
            Create Product
          </BaseButton>
        </S.Card>
      </S.TablesWrapper>
    </>
  );
};

export default ProductDashboard;
