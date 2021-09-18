import React, { useState } from "react";
import styled from "styled-components";
/* eslint-disable import/no-unresolved */
import { Meta } from "@storybook/react/types-6-0";
import GradientBorderBox from "./GradientBorderBox";

const Row = styled.div`
  margin-bottom: 32px;

  & > button + button {
    margin-left: 16px;
  }
`;

export default {
  title: "Components/GradientBorderBox",
  component: GradientBorderBox,
  argTypes: {},
} as Meta;

export const Default: React.FC = () => {
  return (
    <>
      <Row>
        <GradientBorderBox style={{ width: "300px", height: "300px" }} />
      </Row>
    </>
  );
};
