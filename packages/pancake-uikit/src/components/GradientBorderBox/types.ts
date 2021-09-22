import React from "react";

interface Props {
  colorLeft?: string;
  colorRight?: string;
  borderWidth?: string;
}

export type GradientBorderBoxProps = Props & React.HTMLProps<HTMLDivElement>;
