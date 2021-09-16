import React, { FC } from "react";
import styled from "styled-components";
import { BorderGradientButtonProps } from "./types";

const Wrapper = styled.div<{ colorLeft: string; colorRight: string }>`
  --b: 2px; /* border width*/
  --r: 16px; /* the radius */

  display: flex;
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

  &:hover {
    opacity: 0.6;
  }
`;

const Label = styled.span<{
  fontSize?: string;
  colorLeft: string;
  colorRight: string;
}>`
  margin: auto;
  padding: 8px;
  font-size: ${(props) => props.fontSize || "24px"};
  background: linear-gradient(
    to right,
    ${(props) => props.colorLeft},
    ${(props) => props.colorRight}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
`;

const BorderGradientButton: FC<BorderGradientButtonProps> = ({
  label,
  fontSize,
  colorLeft = "#bb5370",
  colorRight = "#529dd6",
  style,
  onClick,
}) => {
  return (
    <Wrapper
      colorLeft={colorLeft}
      colorRight={colorRight}
      style={style}
      onClick={onClick}
    >
      <Label fontSize={fontSize} colorLeft={colorLeft} colorRight={colorRight}>
        {label}
      </Label>
    </Wrapper>
  );
};

export default BorderGradientButton;
