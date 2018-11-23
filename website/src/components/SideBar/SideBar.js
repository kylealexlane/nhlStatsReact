import React from "react";
import styled, { withTheme } from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import { TopBar } from "../TopBar";

const { Sider } = Layout;
const { Item, SubMenu, ItemGroup } = Menu;

const StyledLogo = styled.h1`
  font-family: ${props => props.theme.logoFont};
  color: ${props => props.theme.colors.text.white};
  font-size: 26px;
  margin: 0;
  padding: 0;
`;

const StyledMenu = styled(Menu)`
  // background-color: #f76600;
  // color: #fff !important;
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
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <StyledMenu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
          >
            <Item>
              <StyledLink to="/">
                <StyledLogo>PuckLuck</StyledLogo>
              </StyledLink>
            </Item>
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
      </Layout>
    );
  }
}

export default withRouter(withTheme(SideBar));
