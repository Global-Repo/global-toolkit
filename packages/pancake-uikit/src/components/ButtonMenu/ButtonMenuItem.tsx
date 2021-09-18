import React from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import {
  BaseButtonProps,
  PolymorphicComponent,
  variants,
} from "../Button/types";
import { ButtonMenuItemProps } from "./types";

interface InactiveButtonProps extends BaseButtonProps {
  forwardedAs: BaseButtonProps["as"];
}

const InactiveButton: PolymorphicComponent<
  InactiveButtonProps,
  "button"
> = styled(Button)<InactiveButtonProps>`
  background-color: transparent;
  color: ${({ theme, variant }) =>
    variant === variants.PRIMARY
      ? theme.colors.primary
      : theme.colors.textSubtle};
  &:hover:not(:disabled):not(:active) {
    background-color: transparent;
  }
`;

const InactiveGradientButton: PolymorphicComponent<
  InactiveButtonProps,
  "button"
> = styled(Button)<InactiveButtonProps>`
  background: linear-gradient(to right, #e94e2c, #529cd6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  &:hover:not(:disabled):not(:active) {
    background-color: transparent;
  }
`;

const ButtonMenuItem: PolymorphicComponent<ButtonMenuItemProps, "button"> = ({
  isActive = false,
  variant = variants.PRIMARY,
  as,
  ...props
}: ButtonMenuItemProps) => {
  if (!isActive) {
    if (variant === variants.FULL_GRADIENT) {
      return <InactiveGradientButton forwardedAs={as} {...props} />;
    }
    return <InactiveButton forwardedAs={as} variant="tertiary" {...props} />;
  }

  return <Button as={as} variant={variant} {...props} />;
};

export default ButtonMenuItem;
