import React from "react";
import styled, { withTheme } from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import { TopBar } from "../TopBar";
import mainTheme from "../../styles/theme"
import { changeSidebarStatus, changeSidebarGoneStatus } from '../../actions/sidebar';
import { connect } from 'react-redux';
import { layout } from '../../styles/theme'
// import { withRouter } from 'react-router-dom'



const { Item } = Menu;

const LogoItem = styled(Item)``;

const Sider = styled(Layout.Sider)`
  background-color: #f76600;
   position: sticky;
   top: 0;
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
  .ant-menu-item {
    background-color: #f76600;
  }
  .ant-menu-sub {
    background: #f76600 !important;
    box-shadow: none !important;
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
  constructor(props) {
    super(props);
    this.state = {
      current: "players",
      collapsed: this.props.sidebarCollapsed,
      width: 0,
      height: 0,
      gone: this.props.sidebarGone,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sidebarCollapsed !== this.state.sidebarCollapsed) {
      this.setState({ collapsed: nextProps.sidebarCollapsed });
    }
    if (nextProps.sidebarGone !== this.state.sidebarGone) {
      this.setState({ gone: nextProps.sidebarGone });
    }
  }

  toggle = () => {
    this.props.changeSB(!this.props.sidebarCollapsed);
  };

  handleClick = e => {
    // console.log("click ", e);
    this.setState({
      current: e.key
    });
  };

  updateWindowDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    if(window.innerWidth < mainTheme.layout.sidebarGoneWidth){
      this.props.changeSBGone(true);
      this.props.changeSB(true);
    }
    if(window.innerWidth >= mainTheme.layout.sidebarGoneWidth){
      this.props.changeSBGone(false);
      this.props.changeSB(true);
    }
    if(window.innerWidth >= mainTheme.layout.sidebarExpandedWidth){
      this.props.changeSBGone(false);
      this.props.changeSB(false);
    }
  }

  render() {
    console.log("gone", this.state.gone);
    console.log("state", this.state);
    console.log("props", this.props);


    return (
      <React.Fragment>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} width={layout.sideBarWidth} collapsedWidth={this.state.gone ? 0 : layout.sidebarCollapsedWidth}>
          <StyledMenu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
          >
            <LogoItem >
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
            <Item key="goalies">
              <StyledLink to="/goalies">
                <StyledIcon type="table" />
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
              <Item key="offensiveteams">
                <StyledLink to={{ pathname: "/teams", state: {situation: "offensive"} }}>
                  <StyledIcon type="user" />
                  <span>Offensive</span>
                </StyledLink>
              </Item>
              <Item key="defensiveteams">
                <StyledLink to={{ pathname: "/teams", state: {situation: "defensive"} }}>
                  <StyledIcon type="table" />
                  <span>Defensive</span>
                </StyledLink>
              </Item>
            </SubMenu>
            <Item key="model" disabled>
              <StyledLink to={{ pathname: "/post/model-general-overview" }}>
                <StyledIcon type="radar-chart" />
                <span>Model</span>
              </StyledLink>
            </Item>
            <Item key="blog" >
              <StyledLink to="/blog">
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
    changeSB: (bool) => dispatch(changeSidebarStatus(bool)),
    changeSBGone: (bool) => dispatch(changeSidebarGoneStatus(bool))
  };
};

const mapStateToProps = (state) => {
  return {
    sidebarCollapsed: state.sidebarCollapsed,
    sidebarGone: state.sidebarGone
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (withTheme(SideBar)));
