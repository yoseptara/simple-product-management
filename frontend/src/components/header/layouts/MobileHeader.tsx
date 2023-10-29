import React from "react";
import * as S from "../Header.styles";
import { BaseRow } from "@src/components/common/BaseRow/BaseRow";
import { BaseCol } from "@src/components/common/BaseCol/BaseCol";

interface MobileHeaderProps {
  toggleSider: () => void;
  isSiderOpened: boolean;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  toggleSider,
  isSiderOpened,
}) => {
  return (
    <BaseRow justify="space-between" align="middle">
      <BaseCol>
        <BaseRow align="middle"></BaseRow>
      </BaseCol>

      <S.BurgerCol>
        <S.MobileBurger onClick={toggleSider} isCross={isSiderOpened} />
      </S.BurgerCol>
    </BaseRow>
  );
};
