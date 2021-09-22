import styled, { DefaultTheme } from "styled-components";
import { space, variant } from "styled-system";
import { Colors } from "../../theme/types";
import { scaleVariants, styleVariants } from "./theme";
import { TagProps, variants } from "./types";

interface ThemedProps extends TagProps {
  theme: DefaultTheme;
}

const getOutlineStyles = ({
  outline,
  theme,
  variant: variantKey = variants.PRIMARY,
}: ThemedProps) => {
  if (outline) {
    if (variantKey === variants.GRADIENT) {
      return `
      --b: 2px;
      --r: 16px;
    
      display: inline-flex;
      position: relative;
      z-index: 0;
      background: transparent;
      
      &:text {
      color: blue;
      }
    
      &:before {
        content: "";
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: var(--b);
        border-radius: var(--r);
        background: var(
          --c,
          linear-gradient(
            to right,
            #e52420,
            #ce850e
          )
        );
        -webkit-mask: linear-gradient(#fff 0 0) content-box,
          linear-gradient(#fff 0 0);
        -webkit-mask-composite: destination-out;
        mask-composite: exclude;
    `;
    }

    const themeColorKey = styleVariants[variantKey]
      .backgroundColor as keyof Colors;
    const color = theme.colors[themeColorKey];

    return `
      color: ${color};
      background: transparent;
      border: 2px solid ${color};
    `;
  }

  return "";
};

export const StyledTag = styled.div<ThemedProps & TagProps>`
  align-items: center;
  border-radius: 16px;
  color: #ffffff;
  display: inline-flex;
  font-weight: 400;
  white-space: nowrap;

  & > svg {
    fill: currentColor;
  }

  & > span {
    background: ${(props) =>
      props.variant === variants.GRADIENT
        ? "linear-gradient(to right, #e52420, #ce850e)"
        : "currentColor"};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  ${variant({
    prop: "scale",
    variants: scaleVariants,
  })}
  ${variant({
    variants: styleVariants,
  })}
  ${space}

  ${getOutlineStyles}
`;

export default null;
