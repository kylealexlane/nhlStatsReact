import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import * as PropShapes from "utils/propShapes";
import { PortfolioPageHeader } from "components/PortfolioPageHeader";
import { PortfolioPageFooter } from "components/PortfolioPageFooter";
import { ContentWrapper } from "components/ContentWrapper";

const PortfolioSection = styled.div`
  ${props => props.theme.flex.center};
  padding: ${props => props.theme.padding.eighty} 0;
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.padding.fourtyEight} 0;
  }
`;

const PortfolioPage = props => (
  <React.Fragment>
    <PortfolioPageHeader
      mainHeading={props.mainHeading}
      keywords={props.keywords}
      description={props.description}
      background={props.background}
      previous={props.previous}
      next={props.next}
    />
    <PortfolioSection>
      <ContentWrapper>{props.children}</ContentWrapper>
    </PortfolioSection>
    <PortfolioPageFooter previous={props.previous} next={props.next} />
  </React.Fragment>
);

PortfolioPage.propTypes = {
  mainHeading: PropTypes.string.isRequired,
  keywords: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  background: PropTypes.func,
  previous: PropShapes.portfolioData,
  next: PropShapes.portfolioData,
  children: PropTypes.node
};

PortfolioPage.defaultProps = {
  background: () => {},
  children: null,
  previous: "",
  next: ""
};

export default PortfolioPage;
