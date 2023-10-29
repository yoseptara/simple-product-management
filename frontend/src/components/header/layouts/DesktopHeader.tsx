import React from "react";
import { HeaderFullscreen } from "../components/HeaderFullscreen/HeaderFullscreen";
import * as S from "../Header.styles";
import { BaseRow } from "@src/components/common/BaseRow/BaseRow";
import { BaseCol } from "@src/components/common/BaseCol/BaseCol";

interface DesktopHeaderProps {
  isTwoColumnsLayout: boolean;
}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  isTwoColumnsLayout,
}) => {
  const leftSide = isTwoColumnsLayout ? (
    <S.SearchColumn xl={16} xxl={17}>
      <BaseRow justify="space-between"></BaseRow>
    </S.SearchColumn>
  ) : (
    <></>
  );

  return (
    <BaseRow justify="space-between" align="middle">
      {leftSide}

      <S.ProfileColumn xl={8} xxl={7} $isTwoColumnsLayout={isTwoColumnsLayout}>
        <BaseRow align="middle" justify="end" gutter={[5, 5]}>
          <BaseCol>
            <BaseRow gutter={[{ xxl: 5 }, { xxl: 5 }]}>
              <BaseCol>
                <HeaderFullscreen />
              </BaseCol>
            </BaseRow>
          </BaseCol>
        </BaseRow>
      </S.ProfileColumn>
    </BaseRow>
  );
};
