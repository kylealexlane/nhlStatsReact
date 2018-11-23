import React from "react";
import styled, { withTheme } from "styled-components";
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';

import { HeadingWrapper } from "../../components/HeadingWrapper";
import "../../styles/main.css";
import { Ipad } from '../../components/Ipad';
import CSSPNG from '../../assets/pngs/css.png';
import JsPNG from '../../assets/pngs/javascript.png';
import DBPNG from '../../assets/pngs/db.png';
import MySQLPHPPNG from '../../assets/pngs/phpsql.png';
import HTMLPNG from '../../assets/pngs/html.png';
import IpadMMS from '../../assets/oldImages/IpadMMSTasks.png';
import IpadMMSSignIn from '../../assets/oldImages/IpadMMSSignIn.png';

const images = [IpadMMS, IpadMMSSignIn];

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
  margin-top: 150;
`;

const ColumnDivIpad = styled.div`
  ${props => props.theme.flex.flexColumnCenter};
  flex: 1;
  height: 100%;
  margin-top: 150;
  align-items: flex-end
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

class FNApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dotsFreq: 7,
      typingCompleted: true,
      currentImage: IpadMMS,
    };
  }
  componentDidMount() {
    document.title = "K.L | FN MMS";
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
        <HeadingWrapper>
          <MarginTopDiv>
            <ColumnDiv>
              <RowDiv>
                <ColumnDiv>
                  <HeaderRowDiv>
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
                        <span>FN MMS </span>
                      </Typist>
                    </MainHeading>
                  </HeaderRowDiv>
                  <HeadingText>Problem</HeadingText>
                  <MainText>
                    First Nations were tracking and processing maintenance/management data by paper with no structure or oversight.
                  </MainText>
                  <HeadingText>SOLUTION</HeadingText>
                  <MainText>
                    Web app to track/record tasks and testing results with Google calendar integration. Simple login system and easy
                    to understand UI.
                  </MainText>
                  <HeadingText>DEV</HeadingText>
                  <MainText>
                    Worked at RJ. Burnside and proposed, designed, and developed this web application to
                    improve organization and productivity within the First Nation Communities
                  </MainText>
                  <TechRowDiv>
                    <StyledImage src={HTMLPNG} />
                    <StyledImage src={CSSPNG} />
                    <StyledImage src={JsPNG} />
                    <StyledImage src={DBPNG} />
                    <StyledImage src={MySQLPHPPNG} />
                  </TechRowDiv>
                </ColumnDiv>
                <ColumnDivIpad>
                  <Ipad animation={'right'} pic={this.state.currentImage}/>
                </ColumnDivIpad>
              </RowDiv>
            </ColumnDiv>
          </MarginTopDiv>
        </HeadingWrapper>
      </React.Fragment>
    );
  }
}

export default withTheme(FNApp);