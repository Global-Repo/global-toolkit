import React, { useState } from "react";
import styled from "styled-components";
/* eslint-disable import/no-unresolved */
import { Meta } from "@storybook/react/types-6-0";
import BorderGradientButton from "./BorderGradientButton";

const Row = styled.div`
  margin-bottom: 32px;

  & > button + button {
    margin-left: 16px;
  }
`;

export default {
  title: "Components/Border-Gradient Button",
  component: BorderGradientButton,
  argTypes: {},
} as Meta;

export const Default: React.FC = () => {
  return (
    <>
      <Row>
        <BorderGradientButton
          label="Standard"
          onClick={() => alert("clicked!!!")}
          style={{ width: "300px" }}
        />
      </Row>
      <Row>
        <BorderGradientButton
          label="hello hello"
          onClick={() => alert("clicked!!!")}
          colorLeft="green"
          colorRight="yellow"
          style={{ padding: "16px", width: "300px" }}
          fontSize="16px"
        />
      </Row>
      <Row>
        <BorderGradientButton
          label="abcdefghijklmnopqrstuvwxyz"
          onClick={() => alert("clicked!!!")}
          colorLeft="red"
          colorRight="blue"
          style={{ padding: "16px", width: "50%" }}
        />
      </Row>
      <Row>
        <BorderGradientButton
          label="bye bye"
          onClick={() => alert("clicked!!!")}
          colorLeft="pink"
          colorRight="violet"
          style={{ padding: "20px", height: "200px" }}
          fontSize="56px"
        />
      </Row>
    </>
  );
};
