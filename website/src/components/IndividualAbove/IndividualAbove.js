import React from "react";
import styled, { withTheme } from "styled-components";
import "react-typist/dist/Typist.css";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import { Spin } from 'antd';
import {teamInfoFetchData} from "../../actions/teams";



const WrapperDiv = styled.div`
  width: 100%;
  // height: ${props => props.theme.layout.individualAboveHeightInt}px;
  height: 300px;
  background-size:     cover;
  background-repeat:   no-repeat;
  background-position: center center; 
  align-items: center;
  padding: 0px;
`;

const DarkDiv = styled.div`
  width: 100%;
  height: 300px;
  background-size:     cover;
  background-repeat:   no-repeat;
  background-position: center center; 
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 16px;
`;

const LeftDiv = styled.div`
  display: flex;
  flex-basis: 50%;
  height: 90%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 16px;
  margin-bottom: 16px;
  // margin-top: 16px;
  border-left: 5px solid ${props => props.theme.colors.mainAccent};
  position: relative;
`;

const RightDiv = styled.div`
  display: flex;
  flex-basis: 50%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const FirstName = styled.h2`
  // color: ${props => props.theme.colors.mainAccent};
  color: #ffffff;
  text-transform: none;
  margin: 0;
  padding: 0;
`;

const HeadingText = styled.h3`
  // color: ${props => props.theme.colors.mainAccent};
  color: #fafafa;
  text-transform: none;
  margin: 0;
  padding: 0;
`;

const LastName = styled.h1`
  // color: ${props => props.theme.colors.mainAccent};
  color: #ffffff;
  text-transform: uppercase;
  margin: 0;
  padding: 0;
`;

const FaceImage = styled.img`
  height: 80%;
  width: auto;
`;

const LogoNum =  styled.div`
  display: flex;  
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
`;

const MobileFaceImage =  styled.img`
  bottom: 0;
  right: 0;
  height: 100px;
`;

const SmallLogo = styled.img`
  height: 50px;
  width: auto;
  padding-left: 16px;
`;


class IndividualAbove extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: this.props.isLoading? this.props.isLoading : true,
      data: [],
      bio: [],
      teamInfoLoading: false,
      teamInfo: {},
      teamid: 0,
    };
    this.fetchTeamInfoAfter = this.fetchTeamInfoAfter.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let bio = "playerBio";
    let loading = "isLoading";
    let d = "player";

    if(this.props.type === "goalie"){
      bio = "goalieBio";
      loading = "goalieIsLoading";
      d = "goalie";
    } else if(this.props.type === "player"){
      bio = "playerBio";
      loading = "isLoading";
      d = "player";
    }

    if (nextProps[bio] !== this.state.data) {
      this.setState({ data: nextProps[d] });
    }
    if (nextProps[bio] !== this.state.bio && !nextProps[loading] && nextProps[bio].currentTeam) {
      this.setState({
        bio: nextProps[bio],
        teamid: nextProps[bio].currentTeam.id
      });
      this.fetchTeamInfoAfter(nextProps[bio].currentTeam.id);
    }
    if (nextProps[loading] !== this.state.isLoading) {
      this.setState({ isLoading: nextProps[loading] });
    }

    if (nextProps.teamInfo !== this.state.teamInfo) {
      this.setState({ teamInfo: nextProps.teamInfo });
    }
  }

  fetchTeamInfoAfter(teamid) {
    this.props.fetchTeamInfo(`https://statsapi.web.nhl.com/api/v1/teams/${teamid}`);
  }

  render() {
    let teamid = 0;
    let teamabbr = "";
    if (!this.state.isLoading && this.state.bio.currentTeam){
      teamid = this.state.bio.currentTeam.id
    }
    if(this.state.teamInfo.teams){
      teamabbr = this.state.teamInfo.teams[0].abbreviation
    }
    let content = (
      <LoadingWrapper>
        <Spin tip="Loading...">
        </Spin>
      </LoadingWrapper>
    );
    if (!this.state.isLoading && this.state.teamInfo.teams) {
      content = (
        <WrapperDiv style={{ backgroundImage: `url(https://cms.nhl.bamgrid.com/images/actionshots/${this.state.bio.id}_low_resolution.jpg)`}}>
          <DarkDiv style={{background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))'}}>
            <LeftDiv>
              <FirstName>{this.state.bio.firstName}</FirstName>
              <LastName>{this.state.bio.lastName}</LastName>
              <HeadingText>{this.state.bio.height} | {this.state.bio.currentAge} | {this.state.bio.weight}lbs</HeadingText>
            </LeftDiv>
            <RightDiv>
              <LogoNum>
                <SmallLogo src={`https://assets.nhle.com/nhl/images/logos/teams/${teamabbr}_logo.svgz?v=12.16`}/>
              </LogoNum>
              {this.props.isMobile ?
                <MobileFaceImage src={`https://assets.nhle.com/mugs/nhl/20192020/${teamabbr}/${this.state.bio.id}.png`} />
                :
                <FaceImage src={`https://assets.nhle.com/mugs/nhl/20192020/${teamabbr}/${this.state.bio.id}.png`} />
              }
            </RightDiv>
          </DarkDiv>
        </WrapperDiv>
      );
    }

    return (
      <React.Fragment>
      {content}
      </React.Fragment>
    )}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTeamInfo: (url) => dispatch(teamInfoFetchData(url)),
  };
};

const mapStateToProps = (state) => {
  return {
    player: state.player,
    playerBio: state.playerBio,
    hasErrored: (state.playerHasErrored || state.playerBioHasErrored),
    isLoading: (state.playerIsLoading|| state.playerBioIsLoading),

    goalie: state.goalie,
    goalieBio: state.goalieBio,
    goalieHasErrored: (state.goalieHasErrored || state.goalieBioHasErrored),
    goalieIsLoading: (state.goalieIsLoading || state.goalieBioIsLoading),

    sidebarCollapsed: state.sidebarCollapsed,
    sidebarGone: state.sidebarGone,
    teamInfo: state.teamInfo,
    teamInfoLoading: state.teamInfoIsLoading,

    isMobile: state.isMobileMode,
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps) (withTheme(IndividualAbove)));
