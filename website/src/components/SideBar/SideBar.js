import React from "react";
import styled, { withTheme } from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import { TopBar } from "../TopBar";
import mainTheme from "../../styles/theme"
import { changeSidebarStatus } from '../../actions/sidebar';
import { connect } from 'react-redux';


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
    collapsed: this.props.sidebarCollapsed
  };

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.sidebarCollapsed !== this.state.sidebarCollapsed) {
      this.setState({ collapsed: nextProps.sidebarCollapsed });
    }
  }

  toggle = () => {
    console.log(this.props.sidebarCollapsed);
    this.props.changeSB(!this.props.sidebarCollapsed);
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
            <LogoItem disabled>
              <StyledLink to="/">
                {this.state.collapsed && <StyledIcon type="home" />}
                <StyledLogo>PuckLuck</StyledLogo>
              </StyledLink>
            </LogoItem>
            <Item key="players">
              <StyledLink to="/players">
                <StyledIcon type="user" />
                <span>Players</span>
              </StyledLink>
            </Item>
            <Item key="goalies" disabled>
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
              } disabled
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
            <Item key="model" disabled>
              <StyledLink to="/model">
                <StyledIcon type="radar-chart" />
                <span>Model</span>
              </StyledLink>
            </Item>
            <Item key="blog" disabled>
              <StyledLink to="/model">
                <StyledIcon type="laptop" />
                <span>Blog</span>
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

const mapDispatchToProps = (dispatch) => {
  return {
    changeSB: (bool) => dispatch(changeSidebarStatus(bool))
  };
};

const mapStateToProps = (state) => {
  return {
    sidebarCollapsed: state.sidebarCollapsed
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (withTheme(SideBar));
