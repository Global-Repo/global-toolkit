import React from "react";

interface Props {
  label: string;
  fontSize?: string;
  colorLeft?: string;
  colorRight?: string;
}

export type BorderGradientButtonProps = Props & React.HTMLProps<HTMLDivElement>;
