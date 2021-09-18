import React, { cloneElement, Children, ReactElement } from "react";
import styled, { DefaultTheme } from "styled-components";
import { space } from "styled-system";
import { scales, variants } from "../Button/types";
import { ButtonMenuProps } from "./types";

interface StyledButtonMenuProps extends ButtonMenuProps {
  theme: DefaultTheme;
}

const getBackgroundColor = ({ theme, variant }: StyledButtonMenuProps) => {
  return theme.colors[variant === variants.SUBTLE ? "input" : "tertiary"];
};

const getBorderColor = ({ theme, variant }: StyledButtonMenuProps) => {
  return theme.colors[
    variant === variants.SUBTLE ? "inputSecondary" : "disabled"
  ];
};

const StyledButtonMenu = styled.div<StyledButtonMenuProps>`
  background-color: ${getBackgroundColor};
  border-radius: 8px;
  display: inline-flex;
  border: 1px solid ${getBorderColor};

  & > button + button,
  & > a + a {
    margin-left: 2px; // To avoid focus shadow overlap
  }
  ${space}
`;

const GradientBorderStyledButtonMenu = styled.div<{
  colorLeft: string;
  colorRight: string;
}>`
  --b: 2px; /* border width*/
  --r: 8px; /* the radius */

  display: inline-flex;
  position: relative;
  z-index: 0;

  cursor: pointer;

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
        ${(props) => props.colorLeft},
        ${(props) => props.colorRight}
      )
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
`;

const ButtonMenu: React.FC<ButtonMenuProps> = ({
  activeIndex = 0,
  scale = scales.MD,
  variant = variants.PRIMARY,
  onItemClick,
  children,
  ...props
}) => {
  if (variant === variants.FULL_GRADIENT) {
    return (
      <GradientBorderStyledButtonMenu
        colorLeft="#e94e2c"
        colorRight="#529cd6"
        {...props}
      >
        {Children.map(children, (child: ReactElement, index) => {
          return cloneElement(child, {
            isActive: activeIndex === index,
            onClick: onItemClick ? () => onItemClick(index) : undefined,
            scale,
            variant,
          });
        })}
      </GradientBorderStyledButtonMenu>
    );
  }
  return (
    <StyledButtonMenu variant={variant} {...props}>
      {Children.map(children, (child: ReactElement, index) => {
        return cloneElement(child, {
          isActive: activeIndex === index,
          onClick: onItemClick ? () => onItemClick(index) : undefined,
          scale,
          variant,
        });
      })}
    </StyledButtonMenu>
  );
};

export default ButtonMenu;
