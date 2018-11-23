import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import Background from "assets/portfolio/planIt/planItPreview.png";

const Container = styled(Link)`
  width: 100%;
  margin-bottom: ${props => props.theme.padding.thirtyTwo};
  position: relative;
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    width: 48%;
  }
  :hover > div {
    opacity: 0.85;
  }
`;

const Image = styled.img`
  width: 100%;
  display: block;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.4s ease;
  background-color: ${props => props.theme.colors.background.black};
`;

const Text = styled.div`
  width: 70%;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
`;

const MainHeading = styled.h2`
  color: ${props => props.theme.colors.text.white};
  margin-bottom: 0;
`;

const SubHeading = styled.h4`
  color: ${props => props.theme.colors.text.white};
`;

const PortfolioGridItem = props => (
  <Container to={props.link}>
    <Image src={props.background} />
    <Overlay>
      <Text>
        <MainHeading>{props.mainHeading}</MainHeading>
        <SubHeading>{props.subHeading}</SubHeading>
      </Text>
    </Overlay>
  </Container>
);

PortfolioGridItem.propTypes = {
  mainHeading: PropTypes.string,
  subHeading: PropTypes.string,
  background: PropTypes.string,
  link: PropTypes.string
};

PortfolioGridItem.defaultProps = {
  mainHeading: "",
  subHeading: "",
  background: Background,
  link: ""
};

export default PortfolioGridItem;
