import React from "react";
import styled, { withTheme } from "styled-components";
import { withRouter } from "react-router-dom";
import { Icon } from "antd";

const Container = styled.div`
  ${props => props.theme.flex.spaceBetween};
  align-items: center;
  margin-bottom: ${props => props.theme.padding.twelve};
  padding-right: ${props => props.theme.padding.twentyFour};
  background: white;
  width: 100%;
  height: ${props => props.theme.layout.topBarHeight};;
  border-bottom: 0px solid black;
`;

const ExpandIcon = styled.span`
  ${props => props.theme.flex.center};
  cursor: pointer;
  height: 100%;
  padding: 0 ${props => props.theme.padding.twentyFour};
  svg {
    width: 24px;
    height: 24px;
  }
  :hover {
    color: ${props => props.theme.colors.text.black};
    background-color: #eee;
  }
`;

const RightMenuIcon = styled(Icon)`
  margin-left: ${props => props.theme.padding.sixteen};
`;

const TopBar = props => (
  <Container>
    <ExpandIcon onClick={props.toggle}>
      <Icon type={props.collapsed ? "menu-unfold" : "menu-fold"} />
    </ExpandIcon>
    <span>
      {/*<RightMenuIcon type="search" />*/}
      {/*<RightMenuIcon type="question-circle" />*/}
    </span>
  </Container>
);

export default withRouter(withTheme(TopBar));
