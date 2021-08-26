import React from "react";
import styled, { keyframes } from "styled-components";
import { SpinnerProps } from "./types";
import Logo from "../Svg/Icons/Logo";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div``;

const RotatingLogoIcon = styled(Logo)`
  animation: ${rotate} 2s linear infinite;
  transform: translate3d(0, 0, 0);
`;

const Spinner: React.FC<SpinnerProps> = ({ size = 128 }) => {
  return (
    <Container>
      <RotatingLogoIcon width={`${size}px`} />
    </Container>
  );
};

export default Spinner;
