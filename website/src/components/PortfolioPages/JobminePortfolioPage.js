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

import soc from "assets/portfolio/jobmine/1soc.jpg";
import currentDesign from "assets/portfolio/jobmine/2currentDesign.JPG";
import personas from "assets/portfolio/jobmine/3personas.JPG";
import userRequirements from "assets/portfolio/jobmine/4userRequirements.JPG";
import designWalkthrough from "assets/portfolio/jobmine/5designWalkthrough.JPG";
import heuristicEvaluation from "assets/portfolio/jobmine/6heuristicEvaluation.JPG";
import fta from "assets/portfolio/jobmine/7fta.JPG";
import hta from "assets/portfolio/jobmine/8hta.JPG";
import displayControls from "assets/portfolio/jobmine/9displayControls.JPG";

import jobmine1 from "assets/portfolio/jobmine/jobmine1.png";
import jobmine2 from "assets/portfolio/jobmine/jobmine2.png";
import jobmine3 from "assets/portfolio/jobmine/jobmine3.png";
import jobmine4 from "assets/portfolio/jobmine/jobmine4.jpg";

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

const ProcessImage = styled.img`
  width: 100%;
  margin-bottom: ${props => props.theme.padding.eight};
`;

const SolutionProcessImage = styled.img`
  width: 49%;
  height: 100%;
  margin-bottom: ${props => props.theme.padding.sixteen};
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
  }
`;

class JobminePortfolioPage extends React.Component {
  componentDidMount() {
    document.title = "Jessie W | Jobmine";
  }
  render() {
    return (
      <PortfolioPage
        mainHeading={this.props.title}
        keywords={this.props.subHeading}
        description="A redesign of Jobmine, a job board for the University of Waterloo."
        background={this.props.theme.colors.background.jobmineGradient}
        next={this.props.next}
        previous={this.props.previous}
      >
        <TextGroup heading="Background:">
          <MainText>
            For my Human Factors in Design course, the major project was
            completing a redesign. Through a series of 1 hour design sprints,
            from preparing a Situation of Concern Table, to the FTA and HTA, we
            evaluated the current problems with the UI / UX, and after 8
            sprints, proposed a redesign of Jobmine for our persona.
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
          <MainText>
            Redesign Jobmine to have a better user experience, with a focus on
            Human Factors.
          </MainText>
        </TextGroup>
        <TextGroup heading="Process:">
          <FlexWrapper>
            <SprintImageCaption>
              <MainTextSubHeading>1. Situation of Concern</MainTextSubHeading>
              <ProcessImage src={soc} alt={soc} />
              The first task was to define a situation of concern. This included
              looking at the Fats, Assumptions, Critical Requirements, and the
              Critical Constraints of People, Processes, Artifacts, Environment,
              and Resources.
            </SprintImageCaption>

            <SprintImageCaption>
              <MainTextSubHeading>
                2. Analysis of Current Design
              </MainTextSubHeading>
              <ProcessImage src={currentDesign} alt={currentDesign} />
              Next, the current design was analyzed - both pros and cons. We
              annoted sketches of the design, and noted that the biggest problem
              with the design was the size of the font, and the poor usage of
              the full screen.
            </SprintImageCaption>

            <SprintImageCaption>
              <MainTextSubHeading>3. Personas</MainTextSubHeading>
              <ProcessImage src={personas} alt={personas} />
              A primary and secondary persona were then defined - Ming, a
              student, and John, an employer. As depicted above, we went in
              depth into each persona to make them as realistic as possible.
              However, due to time and authorization constraints and no access
              to an employer's point of view of Jobmine, John was not included
              in the rest of the analysis.
            </SprintImageCaption>

            <SprintImageCaption>
              <MainTextSubHeading>4. User Requirements</MainTextSubHeading>
              <ProcessImage src={userRequirements} alt={userRequirements} />
              We then analyzed the Safety, Performance of the system, and
              Preference of the user, based on the description, and defined a
              benchmark and a general testing procedure for each section. We
              noticed that this tool was not ideal for our problem, as "Safety"
              was not very relevant in software, versus a physical design. That
              being said, we primarily focused on Security concerns with
              Jobmine.
            </SprintImageCaption>

            <SprintImageCaption>
              <MainTextSubHeading>5. Design Walkthrough</MainTextSubHeading>
              <ProcessImage src={designWalkthrough} alt={designWalkthrough} />
              This design walkthrough looked at the Discoverability, Conceptual
              Model, Feedback, Affordances, Signifiers, Mapping, and
              Constraints. This helped us notice a lot of flaws in the design
              that we missed in Part 2. Analysis of Current Design, specifically
              regarding feedback and affordances.
            </SprintImageCaption>

            <SprintImageCaption>
              <MainTextSubHeading>6. Heuristic Evaluation</MainTextSubHeading>
              <ProcessImage
                src={heuristicEvaluation}
                alt={heuristicEvaluation}
              />
              Based on the 7 Principles of Universal Design, Jobmine was further
              analyzed. Similar to some of the other tools, certain sections
              were not very useful, for example, Low Physical Effort.
            </SprintImageCaption>

            <SprintImageCaption>
              <MainTextSubHeading>7. Fault Tree Analysis</MainTextSubHeading>
              <ProcessImage src={fta} alt={fta} />
              We made an FTA to break down the steps a user would make and where
              faults could occur. We then sorted this into Technical,
              Environmental, and User events, to better understand the source of
              the problem and how to solve it.
            </SprintImageCaption>

            <SprintImageCaption>
              <MainTextSubHeading>
                8. Hierarchical Task Analysis
              </MainTextSubHeading>
              <ProcessImage src={hta} alt={hta} />
              Similar to the FTA, we broke down every single step Ming had to
              take when using Jobmine. This helped us find a lot of unnecessary
              and repetitive steps, that could be improved upon.
            </SprintImageCaption>

            <SprintImageCaption>
              <MainTextSubHeading>
                9. Analysis of Display Controls
              </MainTextSubHeading>
              <ProcessImage src={displayControls} alt={displayControls} />
              Lastly, we did an analysis of display controls.
            </SprintImageCaption>
          </FlexWrapper>
        </TextGroup>
        <TextGroup heading="Proposed Solution:">
          <FlexWrapper>
            <SolutionProcessImage src={jobmine1} alt={jobmine1} />
            <SolutionProcessImage src={jobmine2} alt={jobmine2} />
            <SolutionProcessImage src={jobmine3} alt={jobmine3} />
            <SolutionProcessImage src={jobmine4} alt={jobmine4} />
          </FlexWrapper>
        </TextGroup>
        <TextGroup heading="Comments:">
          <MainText>
            This was a redesign completed for a school course, with certain
            criteria that needed to be attained. All sprints were timed, and
            there was no chance to do a second iteration. Often times, an
            impulsive design decision had to be made, and this was not usually
            the best choice.
            <br />
            <br />
            For example, the colours of the last screen from the redesign are
            different than the others. This was a result in a very rushed final
            design where we quickly put something together, but did not
            communciate colour codes and simply eyeballed our hand drawn
            mock-up.
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

JobminePortfolioPage.propTypes = {
  title: PropTypes.string.isRequired,
  subHeading: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

export default withTheme(JobminePortfolioPage);
