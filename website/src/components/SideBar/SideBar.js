import React from "react";
import styled, { withTheme } from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import { TopBar } from "../TopBar";
import mainTheme from "../../styles/theme"


const { Item } = Menu;

const LogoItem = styled(Item)``;

const Sider = styled(Layout.Sider)`
  background-color: #f76600;
`;

const StyledLogo = styled.span`
  font-family: ${props => props.theme.logoFont};
  color: ${props => props.theme.colors.text.white};
  font-size: 28px;
  margin: 0;
  padding: 0;
`;

const StyledMenu = styled(Menu)`
  background-color: #f76600;
  height: 100vh;
  position: absolute;
  .ant-menu-item-selected {
    background-color: #d15600 !important;
  }
`;

const SubMenu = styled(Menu.SubMenu)`
  background-color: #f76600;
`;

const ItemGroup = styled(Menu.ItemGroup)`
  background-color: #f76600;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledLink = styled(Link)``;

const StyledIcon = styled(Icon)``;

class SideBar extends React.Component {
  state = {
    current: "players",
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };

  render() {
    return (
      <React.Fragment>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} width={mainTheme.sideBarWidth}>
          <StyledMenu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
          >
            <LogoItem>
              <StyledLink to="/">
                {this.state.collapsed && <StyledIcon type="robot" />}
                <StyledLogo>PuckLuck</StyledLogo>
              </StyledLink>
            </LogoItem>
            <Item key="players">
              <StyledLink to="/players">
                <StyledIcon type="user" />
                <span>Players</span>
              </StyledLink>
            </Item>
            <Item key="goalies">
              <StyledLink to="/goalies">
                <StyledIcon type="lock" />
                <span>Goalies</span>
              </StyledLink>
            </Item>
            <SubMenu
              title={
                <span className="submenu-title-wrapper">
                  <Icon type="team" />
                  <span>Teams</span>
                </span>
              }
            >
              <ItemGroup title="West">
                <Item key="kings">Kings</Item>
                <Item key="wild">Wild</Item>
              </ItemGroup>
              <ItemGroup title="East">
                <Item key="leafs">Leafs</Item>
                <Item key="bruins">Bruins</Item>
              </ItemGroup>
            </SubMenu>
            <Item key="model">
              <StyledLink to="/model">
                <StyledIcon type="radar-chart" />
                <span>Model</span>
              </StyledLink>
            </Item>
          </StyledMenu>
        </Sider>
        <Main>
          <TopBar
            collapsed={this.state.collapsed}
            toggle={() => {
              this.toggle();
            }}
          />
          {this.props.render}
        </Main>
      </React.Fragment>
    );
  }
}

export default withRouter(withTheme(SideBar));
