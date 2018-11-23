import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  ${props => props.theme.flex.center};
  background: ${props => props.theme.colors.background.blue};
  border-radius: 100%;
  width: 90px;
  height: 90px;
  color: ${props => props.theme.colors.text.white};
  :hover {
    background: ${props => props.theme.colors.background.blue};
    -webkit-transition: all 0.8s ease;
    -ms-transition: all 0.8s ease;
    transition: all 0.8s ease;
  }
`;

const Text = styled.p`
  margin: 0;
`;

const ChangePage = props => (
  <StyledLink to={props.link}>
    <Text>{props.title}</Text>
  </StyledLink>
);

ChangePage.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  next: PropTypes.bool
};

ChangePage.defaultProps = {
  next: false
};

export default ChangePage;
