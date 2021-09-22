import React, { FC } from "react";
import styled from "styled-components";
import { GradientBorderBoxProps } from "./types";

const Wrapper = styled.div<{
  colorLeft: string;
  colorRight: string;
  borderWidth: string;
}>`
  --b: ${(props) => props.borderWidth}; /* border width*/
  --r: 16px; /* the radius */

  display: inline-flex;
  position: relative;
  z-index: 0;

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

const GradientBorderBox: FC<GradientBorderBoxProps> = ({
  colorLeft = "#e94e2c",
  colorRight = "#529cd6",
  style,
  children,
  borderWidth = "2px",
}) => {
  return (
    <Wrapper
      colorLeft={colorLeft}
      colorRight={colorRight}
      style={style}
      borderWidth={borderWidth}
    >
      {children}
    </Wrapper>
  );
};

export default GradientBorderBox;
