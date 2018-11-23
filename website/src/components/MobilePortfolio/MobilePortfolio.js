import React from "react";
import styled, { withTheme } from "styled-components";
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';
import { HeadingWrapper } from "../../components/HeadingWrapper";
import "../../styles/main.css";
import { MobilePhone } from '../../components/MobilePhone';
import ApplePNG from '../../assets/pngs/apple.png';
import AndroidPNG from '../../assets/pngs/android.png';
import CSSPNG from '../../assets/pngs/css.png';
import JsPNG from '../../assets/pngs/javascript.png';
import ReactPNG from '../../assets/pngs/react.png';
import DeepStatLogo from '../../assets/DeepStats/DeepStatsLogoCropped.png';
import Lebron from '../../assets/DeepStats/lebron.png';
import LebronShooting from '../../assets/DeepStats/lebronShooting.png';
import Scores from '../../assets/DeepStats/scores.png';




const images = [Lebron, LebronShooting, Scores];


const MainHeading = styled.h1`
  color: ${props => props.theme.colors.mainText};
`;

const HeadingText = styled.h3`
  margin-bottom: 18px;
  color: ${props => props.theme.colors.mainText};
`;

const MainText = styled.p`
    color: ${props => props.theme.colors.mainText};
`;

const RowDiv = styled.div`
  ${props => props.theme.flex.flexRowJustifyStart};
  color: ${props => props.theme.colors.mainText};
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const HeaderRowDiv = styled.div`
  ${props => props.theme.flex.flexRowJustifyStart};
  color: ${props => props.theme.colors.mainText};
  align-items: flex-start;
  margin-bottom: 24;
`;

const TechRowDiv = styled.div`
  ${props => props.theme.flex.flexRowJustifyStart};
  color: ${props => props.theme.colors.mainText};
  align-items: flex-start;
`;

const ColumnDiv = styled.div`
  ${props => props.theme.flex.flexColumnCenter};
  flex: 1;
  height: fit-content;
  margin-top: 150;
`;

const ColumnDivIphone = styled.div`
  ${props => props.theme.flex.flexColumnCenter};
  flex: 1;
  height: fit-content;
  align-items: flex-end;
  @media only screen and (max-width: 600px) {
    align-items: center;
  }
`;

const FullWidthDiv = styled.div`
  ${props => props.theme.flex.flexRowJustifyStart};
  flex-basis: 100%;
`;

const StyledImage = styled.img`
  height: 50px;
  padding-right: 12px;
  width: auto;
`;

const MarginTopDiv = styled.div`
  margin-top: 50px;
  width: 100%;
  // padding-left: 16px;
  // padding-right: 16px;
  padding: 16px;
  @media only screen and (max-width: 600px) {
    margin-top: 40px;
  }
`;

const AppImage = styled.img`
  height: 90px;
  padding-right: 14px;
  width: auto;
  @media only screen and (max-width: 600px) {
    height: 60px;
  }
`;

class MobilePortfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dotsFreq: 7,
      typingCompleted: true,
      currentImage: Lebron,
    };
  }
  componentDidMount() {
    document.title = "K.L | DeepStats";
    this.rotateImages();
  }

  rotateImages() {
    let currentIndex = 0;
    setInterval(() => {
      ++currentIndex;
      if (currentIndex >= images.length) {
        currentIndex = 0;
      }
      this.setState({ currentImage: images[currentIndex] });
    }, 5000);
  }

  render() {
    return (
      <React.Fragment>
        {/*<ParticleBackground numParticles={5} color={'#1E88E5'}/>*/}
        <HeadingWrapper>
          <MarginTopDiv>
          <ColumnDiv>
          <RowDiv>
            <ColumnDiv>
              <HeaderRowDiv>
                <AppImage src={DeepStatLogo} />
                <MainHeading>
                  <Typist
                    cursor={{
                      show: true,
                      blink: true,
                      element: '|',
                      hideWhenDone: false,
                      hideWhenDoneDelay: 2000,
                    }}
                  >
                  <span>DeepStats </span>
                  </Typist>
                </MainHeading>
              </HeaderRowDiv>
              <HeadingText>PROBLEM</HeadingText>
              <MainText>
                I love NBA analytics. Sadly mobile NBA.com and all leading sports apps do not display deep player, team, or game info.
              </MainText>
              <HeadingText>SOLUTION</HeadingText>
              <MainText>
                Core functionality currently includes live in-depth game scores, comprehensive
                player stat pages, and standings which present more analytics than all other
                leading sports apps (TheScore, SportsNet...)
              </MainText>
              <HeadingText>DEV</HeadingText>
              <MainText>
                Developed and designed individually using react native.
                Releasing to Apple Store and Google Play by late June with goal to develop ML/neural net player prediction
                methods later this summer.
              </MainText>
              <TechRowDiv>
                <StyledImage src={ApplePNG} />
                <StyledImage src={AndroidPNG} />
                <StyledImage src={CSSPNG} />
                <StyledImage src={JsPNG} />
                <StyledImage src={ReactPNG} />
              </TechRowDiv>
            </ColumnDiv>
            <ColumnDivIphone>
              <MobilePhone pic={this.state.currentImage}/>
            </ColumnDivIphone>
          </RowDiv>
          </ColumnDiv>
          </MarginTopDiv>
        </HeadingWrapper>
      </React.Fragment>
    );
  }
}

export default withTheme(MobilePortfolio);