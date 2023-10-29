import { BaseCol } from "@src/components/common/BaseCol/BaseCol";
import { EditableVariantTable } from "@src/components/tables/variantTable/EditableVariantTable";
import { FONT_SIZE, media } from "@src/styles/themes/constants";
import styled from "styled-components";

export const Description = styled.div`
  margin-bottom: 24px;
  font-size: ${FONT_SIZE.xs};
  color: var(--text-main-color);

  @media only screen and ${media.xxl} {
    font-size: 1rem;
  }
`;

export const StyledBaseCol = styled(BaseCol)`
  margin-bottom: 24px;
`;

export const StyledEditableVariantTable = styled(EditableVariantTable)`
  margin-bottom: 24px;
`;
