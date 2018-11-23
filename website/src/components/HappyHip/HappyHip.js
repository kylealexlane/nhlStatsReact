import React from "react";
import styled, { withTheme } from "styled-components";
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';

import { HeadingWrapper } from "../../components/HeadingWrapper";
import "../../styles/main.css";
import { MobilePhone } from '../../components/MobilePhone';
import C from '../../assets/pngs/c.png';
import CPlusPlus from '../../assets/pngs/c++.png';
import Arduino from '../../assets/pngs/arduino.png';
import HappyHipPants from '../../assets/pngs/HappyHipPants.png';
import HappyHipCropped from '../../assets/pngs/HappyHipCropped.png';

const images = [HappyHipCropped, HappyHipPants];

const MainHeading = styled.h1`
  color: ${props => props.theme.colors.mainText};
`;

const HeadingText = styled.h3`
  margin-bottom: ${props => props.theme.padding.eight};
  color: ${props => props.theme.colors.mainText};
`;

const MainText = styled.p`
  margin-bottom: ${props => props.theme.padding.twentyFour};
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
  height: 100%;
`;

const ColumnDivPhone = styled.div`
  ${props => props.theme.flex.flexColumnCenter};
  flex: 1;
  height: fit-content;
  @media only screen and (max-width: 900px) {
    order: 1;
    align-items: center;
    justify-content: center;
  }
`;

const MarginTopDiv = styled.div`
  margin-top: 50px;
  width: 100%;
  padding: 16px;
  @media only screen and (max-width: 600px) {
    margin-top: 40px;
  }
`;

const StyledImage = styled.img`
  height: 50px;
  padding-right: 12px;
  width: auto;
`;

const AppImage = styled.img`
  height: 90px;
  padding-right: 14px;
  width: auto;
`;

class HappyHip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dotsFreq: 7,
      typingCompleted: true,
      currentImage: HappyHipCropped,
    };
  }
  componentDidMount() {
    document.title = "K.L | HappyHip";
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
    }, 6000);
  }

  render() {
    return (
      <React.Fragment>
        {/*<ParticleBackground numParticles={3} color={'#2ebe68'}/>*/}
        <HeadingWrapper>
          <MarginTopDiv>
            <ColumnDiv>
              <RowDiv>
                <ColumnDivPhone>
                  <MobilePhone animation={'left'} pic={this.state.currentImage}/>
                </ColumnDivPhone>
                <ColumnDiv>
                  <HeaderRowDiv>
                    {/*<AppImage src={SproutLogo} />*/}
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
                        <span>Happy Hip </span>
                      </Typist>
                    </MainHeading>
                  </HeaderRowDiv>
                  <HeadingText>PROBLEM</HeadingText>
                  <MainText>
                    University/College students spend over <strong>70%</strong> of their time in a sedentary position.
                  </MainText>
                  <HeadingText>SOLUTION</HeadingText>
                  <MainText>
                    Super affordable (under 8$) physical device to get students moving that Institution could give out.
                  </MainText>
                  <HeadingText>DEV</HeadingText>
                  <MainText>
                    Developed an activity tracker that tracks steps, movement type, and time
                    in a sedentary position.
                  </MainText>
                  <TechRowDiv>
                    <StyledImage src={Arduino} />
                    <StyledImage src={CPlusPlus} />
                    <StyledImage src={C} />
                  </TechRowDiv>
                </ColumnDiv>
              </RowDiv>
            </ColumnDiv>
          </MarginTopDiv>
        </HeadingWrapper>
      </React.Fragment>
    );
  }
}

export default withTheme(HappyHip);