import styled, { css } from "styled-components";
import { FlexDiv } from "../FlexDiv/FlexDiv";

const CheckBoxPickWrapper = styled(FlexDiv)`
  ${({ width, height, margin, color }) => css`
    color: ${color ? "var(--" + color + "-color)" : "var(--main-color)"};
    width: ${width || "100%"};
    height: ${height || "100%"};
    margin: ${margin || "0"};
  `}
`;

export { CheckBoxPickWrapper };
