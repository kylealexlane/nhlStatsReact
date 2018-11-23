import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { ContentWrapper } from "components/ContentWrapper";

const Wrapper = styled.section`
  ${props => props.theme.flex.center};
  color: ${props => props.color};
  background: ${props => props.background};
  padding: ${props => props.theme.padding.twentyFour} 0
    ${props => props.theme.padding.eighty};
`;

const Heading = styled.h2`
  margin-bottom: ${props => props.theme.padding.fourtyEight};
`;

const MainSection = props => (
  <Wrapper background={props.background} color={props.color}>
    <ContentWrapper>
      {props.heading && <Heading>{props.heading}</Heading>}
      {props.children}
    </ContentWrapper>
  </Wrapper>
);

MainSection.propTypes = {
  children: PropTypes.node,
  background: PropTypes.func,
  color: PropTypes.func,
  heading: PropTypes.string
};

MainSection.defaultProps = {
  children: "",
  heading: "",
  background: props => props.theme.colors.background.white,
  color: props => props.theme.colors.text.black
};

export default MainSection;
