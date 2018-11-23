import React from "react";
import styled, { withTheme } from "styled-components";
import Particles from 'react-particles-js';
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';
import { Icon } from "antd";
import "../../styles/main.css";
import { HeadingWrapper } from "../../components/HeadingWrapper";
import { ExternalLinks } from '../../components/ExternalLinks';
import { CustomizedTabs } from "../../components/CustomizedTabs";
import { MobilePortfolio } from '../../components/MobilePortfolio';
import { ParticleBackground } from '../../components/ParticleBackground';
import { SproutPage } from '../../components/SproutPage';
import { FNApp } from '../../components/FNApp';
import { HappyHip } from '../../components/HappyHip';


const Wrapper = styled.div`
  ${props => props.theme.flex.center};
  color: ${props => props.theme.colors.mainText};
  background: transparent;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: ${props => props.theme.colors.mainBackground};
  // height: calc(100vh - ${props => props.theme.dimensions.navbar.height});
  height: 100vh;
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    height: auto;
    margin-top: 170px;
  }
`;

const PortfolioTitle = styled.div`
  ${props => props.theme.flex.center};
  color: ${props => props.theme.colors.mainText};
  background: transparent;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  width: 100%;
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    margin-top: -170px;
  }
`;

const TabsDiv = styled.div`
  position: absolute;
  left: 0px;
  top: 32px;
  width: 100%;
  // height: calc(100vh - ${props => props.theme.dimensions.navbar.height});
  // height: 100vh;
`;

const MainHeading = styled.h1`
  margin-bottom: ${props => props.theme.padding.eight};
  color: ${props => props.theme.colors.mainText};
`;

const SubHeading = styled.h1``;

const MainText = styled.h4`
  margin-bottom: ${props => props.theme.padding.twentyFour};
  color: ${props => props.theme.colors.mainText};
  text-align: center;
`;

const Links = styled.p``;

const StyledParticles = styled(Particles)`
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    width: 100%;
    // z-index: -100;
`;

const DownButton = styled(Icon)`
  // position: absolute;
  // bottom: 2;
  // left: 50%;
  align-self: center;
  height: initial;
  font-size: 32px;
  color: ${props => props.theme.colors.mainText};
`;

class PortfolioSection extends React.Component {
  constructor(props) {
    super(props);
    this.changeTab = this.changeTab.bind(this);
    this.state = {
      dotsFreq: 5,
      value: 0,
      currentTab: 0,
    };
  }

  componentDidMount() {
    document.title = "Kyle L | Portfolio";
  }

  changeTab(event, value) {
    console.log('settingValue', value);
    console.log('settingEvent', event);
    this.setState({ currentTab: value });
  }

  renderParticleBackground() {
    console.log('returning');
    if(this.state.currentTab === 0) { return(<ParticleBackground numParticles={5} color={this.props.theme.colors.mainText}/>) }
    if(this.state.currentTab === 1) { return(<ParticleBackground numParticles={9} color={"#1E88E5"}/>) }
    if(this.state.currentTab === 2) { return(<ParticleBackground numParticles={9} color={"#2ebe68"}/>) }
    if(this.state.currentTab === 3) { return(<ParticleBackground numParticles={9} color={this.props.theme.colors.mainText}/>) }
    if(this.state.currentTab === 4) { return(<ParticleBackground numParticles={9} color={"#2ebe68"}/>) }
    return(<ParticleBackground numParticles={5} color={this.props.theme.colors.mainText}/>)
  }

  render() {
    return (
      <React.Fragment>
        {this.renderParticleBackground()}
        <Wrapper>
          <TabsDiv>
            <CustomizedTabs
              callback={this.changeTab}
            />
          </TabsDiv>
          <ExternalLinks />
          { this.state.currentTab === 0 &&
            <PortfolioTitle>
              <HeadingWrapper>
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
                    <span>Portfolio </span>
                  </Typist>
                </MainHeading>
                <MainText>
                  Click on the tabs above to check out my recent work
                </MainText>
              </HeadingWrapper>
            </PortfolioTitle>
          }
          { this.state.currentTab === 1 && <MobilePortfolio />}
          { this.state.currentTab === 2 && <SproutPage />}
          { this.state.currentTab === 3 && <FNApp />}
          { this.state.currentTab === 4 && <HappyHip />}
        </Wrapper>
      </React.Fragment>
    );
  }
}

// PortfolioSection.propTypes = {
//   content: PropTypes.arrayOf(PropShapes.portfolioData),
//   theme: PropTypes.shape({
//     colors: PropTypes.shape({
//       text: PropTypes.objectOf(PropTypes.func),
//       background: PropTypes.objectOf(PropTypes.func)
//     })
//   }).isRequired
// };

export default withTheme(PortfolioSection);
