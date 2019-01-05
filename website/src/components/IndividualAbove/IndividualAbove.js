import React from "react";
import styled, { withTheme } from "styled-components";
import "react-typist/dist/Typist.css";
import {Select, InputNumber} from "antd/lib/index";
import theme, {layout} from "../../styles/theme"
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {playerFetchBio, playerFetchData} from "../../actions/player";
import { Avatar, Spin } from 'antd';


const WrapperDiv = styled.div`
  width: 100%;
  // height: ${props => props.theme.layout.individualAboveHeightInt}px;
  height: 300px;
  background-size:     cover;
  background-repeat:   no-repeat;
  background-position: center center; 
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
`;

const LeftDiv = styled.div`
  display: flex;
  flex-basis: 50%;
  height: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-left: 5px solid ${props => props.theme.colors.mainAccent};
  padding: 16px;
`;

const RightDiv = styled.div`
  display: flex;
  flex-basis: 50%;
  height: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
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
`;

const LastName = styled.h1`
  // color: ${props => props.theme.colors.mainAccent};
  color: #ffffff;
  text-transform: uppercase;
`;


class IndividualAbove extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: this.props.isLoading? this.props.isLoading : true,
      data: [],
      bio: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log("player next props", nextProps);
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.player !== this.state.player) {
      this.setState({ data: nextProps.player });
    }
    if (nextProps.playerBio !== this.state.playerBio) {
      this.setState({ bio: nextProps.playerBio });
    }
    if (nextProps.isLoading !== this.state.isLoading) {
      this.setState({ isLoading: nextProps.isLoading });
    }
  }

  render() {
    let teamid = "";
    if (!this.state.isLoading){
      teamid = this.state.bio.currentTeam.id
    }
    console.log("teamid", teamid);
    let content = (
      <LoadingWrapper>
        <Spin tip="Loading...">
        </Spin>
      </LoadingWrapper>
    );
    if (!this.state.isLoading) {
      content = (
        <WrapperDiv style={{ backgroundImage: `url(https://nhl.bamcontent.com/images/arena/scoreboard/${teamid}@2x.jpg)`}}>
          <LeftDiv>
            <FirstName>{this.state.bio.firstName}</FirstName>
            <LastName>{this.state.bio.lastName}</LastName>
          </LeftDiv>
          <RightDiv>

          </RightDiv>
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
  };
};

const mapStateToProps = (state) => {
  return {
    player: state.player,
    playerBio: state.playerBio,
    hasErrored: (state.playerHasErrored || state.playerBioHasErrored),
    isLoading: (state.playerIsLoading|| state.playerBioIsLoading),
    sidebarCollapsed: state.sidebarCollapsed,
    sidebarGone: state.sidebarGone,
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps) (withTheme(IndividualAbove)));
