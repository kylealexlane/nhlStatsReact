import React from "react";
import styled, { withTheme } from "styled-components";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { Icon } from "antd";

import { ContentWrapper } from "components/ContentWrapper";

import Resume from "assets/resume.pdf";

const Container = styled.div`
  ${props => props.theme.flex.spaceBetween};
`;

const Logo = styled(Link)`
  font-weight: 500;
  font-size: 50px;
  position: fixed;
  z-index: 2;
  left: ${props => props.theme.padding.fourtyEight};
  top: ${props => props.theme.padding.twentyFour};
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
  color: ${props => props.theme.colors.text.black};
`;

const CircleIconButton = styled.a`
  ${props => props.theme.flex.center};
  background: ${props =>
    props.background || props.theme.colors.background.blueGradient};
  border-radius: 100%;
  width: 56px;
  height: 56px;
  z-index: 4;
  :hover {
    background: ${props => props.theme.colors.background.blue};
    -webkit-transition: all 0.8s ease;
    -ms-transition: all 0.8s ease;
    transition: all 0.8s ease;
  }
`;

const HamburgerButtonWrapper = CircleIconButton.extend`
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    right: ${props => props.theme.padding.twentyFour};
    top: ${props => props.theme.padding.twentyFour};
  }
  position: fixed;
  right: ${props => props.theme.padding.fourtyEight};
  top: 37px;
  opacity: 0.85;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 3px 15px 0 rgba(0, 0, 0, 0.19);
`;

const HamburgerMenuIcon = styled(Icon)`
  align-self: center;
  height: initial;
  color: ${props => props.theme.colors.text.white};
`;

const HamburgerMenu = styled.h3`
  ${props => props.theme.flex.center};
  background: ${props => props.theme.colors.background.grey};
  position: fixed;
  z-index: 2;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  transition: all 0.25s;
`;

const HamburgerLinks = styled.div`
  ${props => props.theme.flex.center};
  flex-direction: column;
`;

const HamburgerLink = styled(Link)`
  color: ${props => props.theme.colors.text.white};
  margin: ${props => props.theme.padding.sixteen} 0;
  font-weight: 500;
`;

// const NavBarWrapper = styled.nav`
//   color: ${props => props.theme.colors.text.dark};
//   ${props => props.theme.dimensions.navbar};
//   ${props => props.theme.flex.flexEnd};
//   background: transparent;
//   z-index: 1;
//   position: fixed;
//   width: 100%;
//   right: ${props => props.theme.padding.thirtyTwo};
//   @media (max-width: ${props => props.theme.breakpoints.sm}) {
//     display: none;
//   }
// `;

// const NavBarLinks = styled.div`
//   ${props => props.theme.flex.center};
// `;

// const NavBarLink = styled(Link)`
//   font-size: 20px;
//   color: ${props => props.theme.colors.text.black};
//   margin-left: ${props => props.theme.padding.sixteen};
// `;

const Buttons = styled.div`
  ${props => props.theme.flex.center};
  flex-wrap: wrap;
  margin-top: ${props => props.theme.padding.thirtyTwo};
`;

const SocialButtonWrapper = CircleIconButton.extend`
  border: none;
  &:hover,
  &:active,
  &:focus {
    outline: none;
    text-decoration: none;
  }
  margin: ${props => props.theme.padding.eight};
`;

const SocialButtonIcon = styled(Icon)`
  align-self: center;
  height: initial;
  color: ${props => props.theme.colors.text.white};
`;

const SocialButton = props => (
  <SocialButtonWrapper color={props.color} href={props.href} target="_new">
    <SocialButtonIcon type={props.icon} />
  </SocialButtonWrapper>
);

SocialButton.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node.isRequired,
  color: PropTypes.string
};

SocialButton.defaultProps = {
  href: "",
  color: null
};

class NavBar extends React.Component {
  state = {
    isMenuOpen: false
  };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        isMenuOpen: false
      });
    }
  }

  toggleMenu = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  };

  mapLinks = component => {
    const Links = [
      {
        title: "Home",
        link: "/"
      },
      {
        title: "About",
        link: "/about"
      },
      {
        title: "Portfolio",
        link: "/portfolio"
      }
    ];
    const Component = component;

    return Links.map(link => (
      <Component exact to={link.link} key={link.link}>
        {link.title}
      </Component>
    ));
  };

  render() {
    return (
      <Container>
        <Logo to="/">KL.</Logo>
        <HamburgerButtonWrapper
          background={this.props.background}
          onClick={this.toggleMenu}
        >
          {this.state.isMenuOpen ? (
            <HamburgerMenuIcon type="close" />
          ) : (
            <HamburgerMenuIcon type="menu-unfold" />
          )}
        </HamburgerButtonWrapper>
        {/* <NavBarWrapper>
          <NavBarLinks>{this.mapLinks(NavBarLink)}</NavBarLinks>
        </NavBarWrapper> */}
        {this.state.isMenuOpen && (
          <HamburgerMenu>
            <ContentWrapper>
              <HamburgerLinks>{this.mapLinks(HamburgerLink)}</HamburgerLinks>
              <Buttons>
                <SocialButton
                  href="https://www.facebook.com/jessie.won"
                  target="_new"
                  color={this.props.theme.colors.background.blueGradient}
                  icon="facebook"
                />
                <SocialButton
                  href="https://www.instagram.com/jessie.won/"
                  target="_new"
                  color={this.props.theme.colors.background.blueGradient}
                  icon="instagram"
                />
                <SocialButton
                  href="https://ca.linkedin.com/in/jhywon"
                  target="_new"
                  color={this.props.theme.colors.background.blueGradient}
                  icon="linkedin"
                />
                <SocialButton
                  href="https://github.com/jessiewon"
                  target="_new"
                  color={this.props.theme.colors.background.blueGradient}
                  icon="github"
                />
                <SocialButton
                  href="mailto:jessiehywon@gmail.com?Subject=Hello"
                  target="_new"
                  color={this.props.theme.colors.background.blueGradient}
                  icon="mail"
                />
                <SocialButton
                  onClick={() => {
                    window.open(Resume);
                  }}
                  target="_new"
                  color={this.props.theme.colors.background.blueGradient}
                  icon="file-text"
                />
              </Buttons>
            </ContentWrapper>
          </HamburgerMenu>
        )}
      </Container>
    );
  }
}

NavBar.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  background: PropTypes.func
};

NavBar.defaultProps = {
  background: null
};

export default withRouter(withTheme(NavBar));
