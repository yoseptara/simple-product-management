import styled, { css } from "styled-components";
import { BaseButton } from "@src/components/common/BaseButton/BaseButton";
import { FONT_SIZE, FONT_WEIGHT } from "@src/styles/themes/constants";

interface ViewAllInternalProps {
  $bordered: boolean;
}

export const ViewAllBtn = styled(BaseButton)<ViewAllInternalProps>`
  font-size: ${FONT_SIZE.xs};

  font-weight: ${FONT_WEIGHT.medium};

  color: var(--text-main-color);

  ${(props) =>
    props.$bordered &&
    css`
      border-bottom: 0.2px solid var(--border-nft-color);
    `};
`;
