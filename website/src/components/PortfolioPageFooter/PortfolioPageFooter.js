import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import * as PropShapes from "utils/propShapes";
import { ContentWrapper } from "components/ContentWrapper";
import { DefaultButton } from "components/Button";
import { ChangePage } from "components/ChangePage";

const Wrapper = styled.header`
  ${props => props.theme.flex.center};
  color: ${props => props.theme.colors.text.black};
  background: ${props =>
    props.background || props.theme.colors.background.white};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding-bottom: ${props => props.theme.padding.eighty};
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding-bottom: ${props => props.theme.padding.fourtyEight};
  }
`;

const Content = styled(ContentWrapper)`
  ${props => props.theme.flex.spaceBetween};
  flex-wrap: wrap;
`;

const StyledChangePage = styled.div`
  @media (min-width: ${props => props.theme.breakpoints.xl}) {
    display: none;
  }
`;

const PortfolioPageFooter = props => (
  <Wrapper background={props.background}>
    <Content>
      {props.previous && (
        <StyledChangePage>
          <ChangePage link={props.previous.link} title={props.previous.title} />
        </StyledChangePage>
      )}
      <Link to="/portfolio">
        <DefaultButton>Back to Portfolio</DefaultButton>
      </Link>
      {props.next && (
        <StyledChangePage>
          <ChangePage link={props.next.link} title={props.next.title} />
        </StyledChangePage>
      )}
    </Content>
  </Wrapper>
);

PortfolioPageFooter.propTypes = {
  background: PropTypes.string,
  previous: PropShapes.portfolioData,
  next: PropShapes.portfolioData
};

PortfolioPageFooter.defaultProps = {
  background: "",
  previous: "",
  next: ""
};

export default PortfolioPageFooter;
