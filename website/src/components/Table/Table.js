import React from "react";
// import styled, { withTheme } from "styled-components";
import "react-typist/dist/Typist.css";
import { Table as AntTable } from "antd";

const Table = props => (
  <AntTable
    columns={props.columns}
    dataSource={props.dataSource}
    onChange={props.onChange}
  />
);

// export default withTheme(Table);
export default Table;