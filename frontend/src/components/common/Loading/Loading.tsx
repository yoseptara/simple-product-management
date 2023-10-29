import React from "react";
import styled from "styled-components";
import { GlobalSpinner } from "@src/components/common/GlobalSpinner/GlobalSpinner";
import { themeObject } from "@src/styles/themes/themeVariables";

interface LoadingProps {
  size?: string;
  color?: string;
}

export const Loading: React.FC<LoadingProps> = ({ size, color }) => {
  const spinnerColor = color || themeObject["light"].spinnerBase;

  return (
    <SpinnerContainer>
      <GlobalSpinner size={size} color={spinnerColor} />
    </SpinnerContainer>
  );
};

const SpinnerContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
