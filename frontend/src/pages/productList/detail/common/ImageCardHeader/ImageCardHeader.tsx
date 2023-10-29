import { BaseCol } from "@src/components/common/BaseCol/BaseCol";
import React, { PropsWithChildren } from "react";
import * as S from "./ImageCardHeader.styles";

interface ImageCardHeaderProps {
  title: string;
}

export const ImageCardHeader: React.FC<
  PropsWithChildren<ImageCardHeaderProps>
> = ({ title, children }) => {
  return (
    <S.WrapperRow justify="space-between">
      <BaseCol>
        <S.Title level={5}>{title}</S.Title>
      </BaseCol>

      {children && <BaseCol>{children}</BaseCol>}
    </S.WrapperRow>
  );
};
