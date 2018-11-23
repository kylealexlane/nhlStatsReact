import React from "react";
import styled, { withTheme } from "styled-components";
import PropTypes from "prop-types";

import { PortfolioPage } from "components/PortfolioPage";
import {
  MainText,
  TextGroup,
  MainTextSubHeading
} from "components/PortfolioPageText";

import Game from "assets/portfolio/planIt/game.png";
import GameHome from "assets/portfolio/planIt/gameHome.png";
import GameRules from "assets/portfolio/planIt/gameRules.gif";

const FinalImages = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    justify-content: space-between;
    flex-direction: row;
  }
  max-width: 800px;
`;

const GameImage = styled.img`
  width: 31%;
  height: 100%;
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 50%;
    margin-bottom: ${props => props.theme.padding.sixteen};
  }
`;

class PlanItPortfolioPage extends React.Component {
  componentDidMount() {
    document.title = "Jessie W | Plan It";
  }
  render() {
    return (
      <PortfolioPage
        mainHeading={this.props.title}
        keywords={this.props.subHeading}
        description="A design and implementation of Plan It, a one button puzzle block game."
        background={this.props.theme.colors.background.planItGradient}
        next={this.props.next}
        previous={this.props.previous}
      >
        <TextGroup heading="Background:">
          <MainText>
            Awarded 3rd place at the UW Game Design Camp hackathon, hosted by
            the University of Waterloo in partnership with the Stratford
            Accelerator Centre, The Games Institute, and the Canadian Digital
            Media Network, my team and I created an interactive one button
            puzzle game, Plan-It, for the 3-storey Christie® MicroTiles® wall.
          </MainText>
        </TextGroup>
        <TextGroup heading="Goal:">
          <MainText>
            Design a 1 button video game for a 3-storey Christie® MicroTiles®
            wall in 48 hours.
          </MainText>
        </TextGroup>
        <TextGroup heading="Process:">
          <MainText>
            Being a hackathon, the requirements for the game were relatively
            open ended. The 3 main requirements were:
            <br />
            <br />
            1. Must be a 1-button video game.
            <br />
            2. Must fit on a 3-storey Christie® MicroTiles® wall.
            <br />
            3. Must be completed within 48 hours.
            <br />
            <br />
            The most difficult design problem was brainstorming a game idea. It
            was difficult to think of a new game that was to be played using
            only 1 button, and also one that could be completed within the 48
            hour time limit. After a long brainstorming session, and countless
            ideas, we ended up on Plan-It.
            <br />
            <br />
            The game Plan-It was inspired by tetris, and was themed around
            building a planet. There were puzzle pieces that would alternate
            coming from the top and bottom of the screen, and the player would
            rotate the planet in the middle in order to align where the pieces
            would land.
            <br />
            <br />
            I worked on a team of four, and we split into two teams of two - one
            for design and one for development. I worked on the design using
            Adobe Illustrator and Photoshop.
            <br />
            <br />
          </MainText>
          <MainTextSubHeading>Design Challenges:</MainTextSubHeading>
          <MainText>
            The biggest challenge was definitely designing for such an oddly
            shaped screen. The dimensions of the screen were 1204x4608. This was
            long and vertical, but at the same time, could not be designed for
            the same way one would design a mobile screen, since it's extremely
            difficult for the user to be able to view the entire screen at once.
            <br />
            <br />
            A strong effort was made to design the game such that the focus of
            the user would be in the middle 50% of the screen. The remainder of
            the screen would be less important information.
            <br />
            <br />
            Futhermore, due to the time constraints, not a lot of time was
            invested in planning out the design. We needed to get it done as
            soon as possible, so there is not too much of a process to document.
            We put a bigger focus on UI rather than UX, and produced a
            functional 1-button video game after 48 hours. Screenshots of the
            game are shown below:
            <br />
            <br />
          </MainText>
          <MainTextSubHeading>Final Design:</MainTextSubHeading>
          <FinalImages>
            <GameImage src={GameHome} alt="home" />
            <GameImage src={GameRules} alt="rules" />
            <GameImage src={Game} alt="game" />
          </FinalImages>
        </TextGroup>
        <TextGroup heading="Comments:">
          <MainText>
            In hindsight, the game that we completed was not very practical or
            feasible. More design resources should have been invested into the
            game mechanics, since the 1-button constraint limited a lot of
            functionality. Tetris already uses 5 button controls, and we decided
            to create a more complex version of Tetris, but with only button.
            Breaking it down into a single-tap and double-tap helped, but it was
            still a poor user experience when playing the game. However, this
            was a great opportunity for us to try new designs, since given the
            time constraint, we had to make very impulsive (and often poor)
            decisions, then work with it!
            <br />
            <br />
            Regardless, this was a very strong effort from myself and my team.
            Although the game mechanics were not perfect, the visual design of
            the game awed the judges. It was incredible to end up playing and
            demonstrating our game on the{" "}
            <a
              href="https://www.instagram.com/p/BCWEhLZEp7q/?taken-by=uwstratford"
              target="_new"
            >
              3-storey
            </a>{" "}
            wall, and was this was overall a great learning experience. This
            game is far from perfect, but given the resource constraints, won us{" "}
            <a
              href="https://www.instagram.com/p/BCWOANfEpwM/?taken-by=uwstratford"
              target="_new"
            >
              3rd place overall
            </a>{" "}
            at the hackathon, which we were extremely proud of :)
          </MainText>
        </TextGroup>
      </PortfolioPage>
    );
  }
}

PlanItPortfolioPage.propTypes = {
  title: PropTypes.string.isRequired,
  subHeading: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

PlanItPortfolioPage.defaultProps = {};

export default withTheme(PlanItPortfolioPage);
