import React from "react";
import styled, { withTheme } from "styled-components";
import PropTypes from "prop-types";

import { PortfolioPage } from "components/PortfolioPage";
import {
  MainText,
  TextGroup,
  MainTextSubHeading
} from "components/PortfolioPageText";

import jobmineOld from "assets/portfolio/jobmine/jobmineOld.png";

const FlexWrapper = styled.div`
  ${props => props.theme.flex.spaceBetween};
  flex-wrap: wrap;
`;

const IntroImage = styled.img`
  margin-top: ${props => props.theme.padding.sixteen};
  width: 100%;
`;

const SprintImageCaption = styled.div`
  display: flex;
  flex-direction: column;
  width: 49%;
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
  }
  margin-bottom: ${props => props.theme.padding.sixteen};
`;

class PathPortfolioPage extends React.Component {
  componentDidMount() {
    document.title = "Jessie W | Path";
  }

  render() {
    return (
      <PortfolioPage
        mainHeading={this.props.title}
        keywords={this.props.subHeading}
        description="A redesign of Jobmine, a job board for the University of Waterloo."
        background={this.props.theme.colors.background.pathGradient}
        next={this.props.next}
        previous={this.props.previous}
      >
        <TextGroup heading="Background:">
          <MainText>
            At Finhacks, my team and I developed an Android application, Path.
            Path is a navigation tool that outputted the best public transit
            route based on the different tasks and the estimated time needed at
            each location, as inputed by the user. Using the Google Maps API, we
            cross referenced public transit schedules, and outputted the most
            efficient route and order of task completion. I worked predominantly
            on the UI, designing the different mockups.
          </MainText>
        </TextGroup>
        <TextGroup heading="Problem:">
          <MainText>
            Jobmine, a job board for the University of Waterloo, was being used
            by thousands of students every year. However, the poor user
            experience often resulted in non-intentional actions from the user.
          </MainText>
          <IntroImage src={jobmineOld} alt={jobmineOld} />
        </TextGroup>
        <TextGroup heading="Goal:">
          Redesign Jobmine to have a better user experience, with a focus on
          Human Factors.
        </TextGroup>
      </PortfolioPage>
    );
  }
}

PathPortfolioPage.propTypes = {
  title: PropTypes.string.isRequired,
  subHeading: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

export default withTheme(PathPortfolioPage);
