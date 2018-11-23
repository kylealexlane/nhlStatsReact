import React from "react";
import styled, { keyframes, withTheme } from "styled-components";
import { Link } from "react-router-dom";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import { Table as AntTable } from "antd";

const Wrapper = styled.div`
  ${props => props.theme.flex.topCenter};
  color: ${props => props.theme.colors.mainText};
  background: ${props => props.theme.colors.mainBackground};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  padding: ${props => props.theme.padding.thirtyTwo};
  background-color: ${props => props.theme.colors.mainBackground};
  // height: calc(100vh - ${props => props.theme.dimensions.navbar.height});
  height: 100vh;
`;

const Table = props => (
  <AntTable
    columns={props.columns}
    dataSource={props.dataSource}
    onChange={props.onChange}
  />
);

export default withTheme(Table);
