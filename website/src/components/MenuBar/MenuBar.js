import React from "react";
import styled, { keyframes, withTheme } from "styled-components";
import { Link, withRouter, Text } from "react-router-dom";
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const OverallWrapper = styled.div`
  ${props => props.theme.flex.flexRowJustifyStart};
  color: ${props => props.theme.colors.mainText};
  background: ${props => props.theme.colors.mainBackground};
  background-size: cover;
  background-repeat: no-repeat;
  background-color: ${props => props.theme.colors.mainBackground};
  // margin-horizontal: 32px;
  width: 100%;
`;

const StyledLink = styled(Link)`
  // margin: 0;
  // padding: 0;
  color: #fff !important;
`;

const StyledLogo = styled.h1`
  font-family: ${props => props.theme.logoFont};
  color: ${props => props.theme.colors.text.white};
  font-size: 26px;
  margin: 0;
  padding: 0;
`;

const StyledMenu = styled(Menu)`
  padding-top: 12px;
  width: 100%;
  // primary-color: #f76600;
  // link-color: #f76600;
  // text-color: rgba(255, 0, 0, .65);
  background-color: #f76600;
  color: #fff !important;
`;

const menuStyle = {
  paddingTop: 12,
  marginRight: 32,
  marginLeft: 32,
};

const StyledIcon = styled(Icon)`
`;

class MenuBar extends React.Component {
  state = {
    current: 'shooters',
  };

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  componentDidUpdate(prevProps) {
  }

  render() {
    return (
      <OverallWrapper>
        <StyledMenu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          theme="light"
        >
          <Menu.Item>
            <StyledLink to="/">
              <StyledLogo>PuckLuck
              </StyledLogo>
            </StyledLink>
          </Menu.Item>
          <Menu.Item key="shooters">
            <StyledLink to="/players">
              <StyledIcon type="user" />Shooters
            </StyledLink>
          </Menu.Item>
          <Menu.Item key="goalies">
            <StyledLink to="/goalies">
              <StyledIcon type="lock" />Goalies
            </StyledLink>
          </Menu.Item>
          <SubMenu title={<span className="submenu-title-wrapper"><Icon type="team" />Teams</span>}>
            <MenuItemGroup title="West">
              <Menu.Item key="kings">Kings</Menu.Item>
              <Menu.Item key="wild">Wild</Menu.Item>
            </MenuItemGroup>
            <MenuItemGroup title="East">
              <Menu.Item key="leafs">Leafs</Menu.Item>
              <Menu.Item key="bruins">Bruins</Menu.Item>
            </MenuItemGroup>
          </SubMenu>
          <Menu.Item key="model">
            <StyledLink to="/model">
              <StyledIcon type="radar-chart" />Model
            </StyledLink>
          </Menu.Item>
          <Menu.Item key="about">
            <StyledLink to="/about">
              <StyledIcon type="question-circle" />About
            </StyledLink>
          </Menu.Item>
        </StyledMenu>
      </OverallWrapper>
    );
  }
}

export default withRouter(withTheme(MenuBar));
