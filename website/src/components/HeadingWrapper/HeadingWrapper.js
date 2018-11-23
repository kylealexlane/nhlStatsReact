import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Content = styled.div`
  margin: 0 ${props => props.theme.padding.fourtyEight};
  max-width: ${props => props.theme.dimensions.maxWidth};
  width: 100%;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin: 0 ${props => props.theme.padding.thirtyTwo};
  }
`;

const HeadingWrapper = props => <Content>{props.children}</Content>;

HeadingWrapper.propTypes = {
  children: PropTypes.node
};

HeadingWrapper.defaultProps = {
  children: null
};

export default HeadingWrapper;
