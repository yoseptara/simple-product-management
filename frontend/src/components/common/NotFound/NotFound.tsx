import React from "react";
import notFoundImg from "@src/assets/images/nothing-found.webp";
import * as S from "./NotFound.styles";
import { BaseImage } from "../BaseImage/BaseImage";

export const NotFound: React.FC = () => {
  return (
    <S.NotFoundWrapper>
      <S.ImgWrapper>
        <BaseImage src={notFoundImg} alt="Not found" preview={false} />
      </S.ImgWrapper>
      <S.Text>Not Found</S.Text>
    </S.NotFoundWrapper>
  );
};
