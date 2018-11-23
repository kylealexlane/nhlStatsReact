import React from "react";
import styled, { withTheme } from "styled-components";
import { withRouter } from "react-router-dom";
import { Icon } from "antd";

const Container = styled.div`
  margin-bottom: 12px;
  padding: 12px;
  background: white;
  width: 100%;
  height: 48px;
  ${props => props.theme.flex.spaceBetween};
  align-items: center;
`;

const TopBar = props => (
  <Container>
    <Icon
      type={props.collapsed ? "menu-unfold" : "menu-fold"}
      onClick={props.toggle}
    />
  </Container>
);

export default withRouter(withTheme(TopBar));
