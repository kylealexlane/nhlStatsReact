import React from "react";
import styled, { withTheme } from "styled-components";
import PropTypes from "prop-types";

import { PortfolioPage } from "components/PortfolioPage";
import {
  MainText,
  TextGroup,
  MainTextSubHeading
} from "components/PortfolioPageText";

import OldHomeDesktop from "assets/portfolio/cognite/old/oldHomeDesktop.png";
import OldHomeMobile from "assets/portfolio/cognite/old/oldHomeMobile.png";
import jobmine1 from "assets/portfolio/jobmine/jobmine1.png";
import jobmine2 from "assets/portfolio/jobmine/jobmine2.png";

const FlexWrapper = styled.div`
  ${props => props.theme.flex.spaceBetween};
  flex-wrap: wrap;
`;

const IntroImage = styled.img`
  margin-top: ${props => props.theme.padding.sixteen};
  width: 49%;
  height: 100%;
`;

const SolutionProcessImage = styled.img`
  width: 49%;
  height: 100%;
  margin-bottom: ${props => props.theme.padding.sixteen};
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
  }
`;

class CognitePortfolioPage extends React.Component {
  componentDidMount() {
    document.title = "Jessie W | Cognite";
  }
  render() {
    return (
      <PortfolioPage
        mainHeading={this.props.title}
        keywords={this.props.subHeading}
        description="A redesign of Cognite's company website."
        background={this.props.theme.colors.background.cogniteGradient}
        next={this.props.next}
        previous={this.props.previous}
      >
        <TextGroup heading="Background:">
          <MainText>
            Cognite is a successul industrial IoT startup based in Norway. They
            had grown to over 50 employees during their first year as a company,
            and large recruiting efforts were being made in order to fulfill
            client requests.
          </MainText>
        </TextGroup>
        <TextGroup heading="Problem:">
          <MainText>
            A large blocker to Cognite's recruiting efforts was the quality of
            their site. This was a quick website thrown together on Wordpress,
            since it was not Cognite's priority at the time. However, with the
            increasing recruiting demand, it was difficult to attract people to
            the Front End / Design team since the website did not reflect strong
            Front End Development and Design skills at the company.
          </MainText>
          <FlexWrapper>
            <IntroImage src={OldHomeDesktop} alt="old home desktop" />
            <IntroImage src={OldHomeMobile} alt="old home desktop" />
          </FlexWrapper>
        </TextGroup>
        <TextGroup heading="Goal:">
          <MainText>
            Redesign Cognite's website to have a better user experience and
            upgraded content, to give a better representation of working at
            Cognite and ultimately support Cognite's recruiting efforts.
            <br />
            <br />
            <strong>NOTE:</strong> This was not my main project while working at
            Cognite. My primary project is under NDA, but I would love to chat
            about it if you're interested in learning more :)
          </MainText>
        </TextGroup>
        <TextGroup heading="Process:">
          <MainText>
            The first thing I did, was address the main problems with the
            current website, and set goals for how to improve them.
            <br />
            1. The content was dry, and did not effectively showcase the values
            of Cognite.
            <br />
            2. The website was not responsive, thus had a very poor user
            experience on mobile.
            <br />
            3. The website was not very visually appealing.
            <br />
            4. The "vibe" from the website seemed very corporate, rather than a
            fun, tech start-up. This made it very difficult to attract young
            talent.
          </MainText>
        </TextGroup>
        <TextGroup heading="Proposed Solution:">
          <MainText>
            After multiple iterations, a final design was approved and launched.
          </MainText>
          <MainTextSubHeading>Test</MainTextSubHeading>
          <FlexWrapper>
            <SolutionProcessImage src={jobmine1} alt={jobmine1} />
            <SolutionProcessImage src={jobmine2} alt={jobmine2} />
          </FlexWrapper>
          <MainText>
            Check out the live site{" "}
            <a href="http://www.cognite.com" target="_new">
              here
            </a>!
          </MainText>
        </TextGroup>
        <TextGroup heading="Results:">
          <MainText>
            This was a redesign completed for a school course, with certain
            criteria that needed to be attained. All sprints were timed, and
            there was no chance to do a second iteration. Often times, an
            impulsive design decision had to be made, and this was not usually
            the best choice.
            <br />
            <br />
            That being said, the design is far from perfect, and there are many
            changes I would make given the chance for the second iteration. I
            felt some of the tools used in the sprint were not optimal for
            redesigning Jobmine, but regardless, this was a great project in
            which I learned and was able to apply a lot of UI/UX and Human
            Factors skills.
          </MainText>
        </TextGroup>
      </PortfolioPage>
    );
  }
}

CognitePortfolioPage.propTypes = {
  title: PropTypes.string.isRequired,
  subHeading: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

export default withTheme(CognitePortfolioPage);
