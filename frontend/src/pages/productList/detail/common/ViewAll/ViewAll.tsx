import React from "react";
import { BaseButtonProps } from "@src/components/common/BaseButton/BaseButton";
import * as S from "./ViewAll.styles";

interface ViewAllProps extends BaseButtonProps {
  bordered?: boolean;
}

export const ViewAll: React.FC<ViewAllProps> = ({
  bordered = true,
  ...props
}) => {
  return (
    <S.ViewAllBtn size="small" $bordered={bordered} type="text" {...props}>
      View All
    </S.ViewAllBtn>
  );
};
