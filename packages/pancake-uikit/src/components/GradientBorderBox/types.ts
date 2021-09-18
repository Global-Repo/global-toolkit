import React from "react";

interface Props {
  colorLeft?: string;
  colorRight?: string;
}

export type GradientBorderBoxProps = Props & React.HTMLProps<HTMLDivElement>;
