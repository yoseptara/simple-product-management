import React from "react";
import { BaseCardProps } from "@src/components/common/BaseCard/BaseCard";
import * as S from "./ImageCard.styles";

interface ImageCardProps extends BaseCardProps {
  isSider?: boolean;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  isSider = false,
  ...props
}) => {
  return (
    <S.Card
      $isSider={isSider}
      autoHeight={false}
      padding={[24, 20]}
      {...props}
    />
  );
};
