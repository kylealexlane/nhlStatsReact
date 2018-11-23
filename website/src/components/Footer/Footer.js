import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import { ContentWrapper } from 'components/ContentWrapper';

import Background from 'assets/footerBackground.png';

const PreFooter = styled.div`
  background: ${props => props.theme.colors.background.blueGradient};
  height: 12px;
`;

const Contact = styled.div`
  ${props => props.theme.flex.center};
  color: ${props => props.theme.colors.text.white};
  background: url(${Background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: ${props => props.theme.padding.eighty} 0;
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.padding.fourtyEight} 0;
  }
`;

const MainHeading = styled.h2`
  padding-bottom: ${props => props.theme.padding.twentyFour};
`;

const SubHeading = styled.h4`
  padding-bottom: ${props => props.theme.padding.twentyFour};
`;

const Details = styled.p``;

const Social = styled.p`
  background: ${props => props.theme.colors.background.black};
  color: ${props => props.theme.colors.text.white};
  height: 80px;
  ${props => props.theme.flex.center};
`;

// const CircleButton = styled.a`
//   display: block;
//   height: 50px;
//   width: 50px;
//   border-radius: 100%;
//   font-size: 30px;
//   line-height: 49px;
//   outline: none;
//   -webkit-transition: all 0.3s;
//   -moz-transition: all 0.3s;
//   transition: all 0.3s;
//   background: ${props => props.theme.colors.background.white};
//   color: ${props => props.theme.colors.text.black};
// `;

// const SocialButton = props => (
//   <CircleButton href={props.link} target="_new" color={props.color}>
//     <Icon type={props.icon} style={{ fontSize: 16, color: 'black' }} />
//   </CircleButton>
// );

const CircleButton = styled(Button)`
  width: 50px !important;
  height: 50px !important;
  .ant-btn {
    display: flex !important;
  }
`;

const SocialButton = props => (
  <CircleButton
    shape="circle"
    size="large"
    icon={props.icon}
    href={props.href}
    target="_new"
  />
);

SocialButton.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  // color: PropTypes.string.isRequired,
};

const Footer = () => (
  <React.Fragment>
    <PreFooter />
    <Contact>
      <ContentWrapper>
        <MainHeading>Lets Get In Touch!</MainHeading>
        <SubHeading>
          Im currently looking for an internship from Sept-Dec 2018.
        </SubHeading>
        <Details>
          If you have any questions, a project you would like to talk about, or
          just want to say hello, shoot me a message and I would love to chat!
        </Details>
      </ContentWrapper>
    </Contact>
    <Social>
      <ContentWrapper>Designed & developed by Jessie Won.</ContentWrapper>
    </Social>
  </React.Fragment>
);

// <SocialButton
//   href="https://www.twitter.com/jessiiewon"
//   color="blue"
//   icon="twitter"
// />
// <SocialButton
//   href="https://www.facebook.com/jessie.won"
//   color="blue"
//   icon="facebook"
// />
// <SocialButton
//   href="https://www.instagram.com/jessie.won/"
//   color="blue"
//   icon="instagram"
// />
// <SocialButton
//   href="https://ca.linkedin.com/in/jhywon"
//   color="blue"
//   icon="linkedin"
// />
// <SocialButton
//   href="https://github.com/jessiewon"
//   color="blue"
//   icon="github"
// />
// <SocialButton
//   type="submit"
//   onClick="window.open(&quot;resume.pdf&quot;)"
//   href="https://www.twitter.com/jessiiewon"
//   color="blue"
//   icon="file-text"
// />

export default Footer;
