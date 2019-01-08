import React from "react";
import styled, { withTheme } from "styled-components";
import "react-typist/dist/Typist.css";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import { Spin } from 'antd';
import {teamInfoFetchData} from "../../actions/teams";
import ShootingSkillGraph from "./ShootingSkillGraph"
import ShotQualityGraph from "./ShotQualityGraph"
import ShotTypesGraph from "./ShotTypesGraph"


const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const GraphTitle = styled.h3`
  margin-left: 16px;
  margin-top: 16px;
  text-transform: none;
  color: ${props => props.theme.colors.mainAccent};
`;

class PlayerGraphs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: this.props.isLoading? this.props.isLoading : true,
      data: [],
      bio: [],
      yearlyPlayoffData: [],
      yearlyRegData: [],
      monthlyPlayoffData: [],
      monthlyRegData: [],
      dataTransformed: false,
    };
    this.transformData = this.transformData.bind(this);
    this.getMetricList = this.getMetricList.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.player !== this.state.data && !nextProps.isLoading) {
      this.setState({ data: nextProps.player });
      this.transformData(nextProps.player);
    }
    if (nextProps.playerBio !== this.state.bio && !nextProps.isLoading) {
      this.setState({ bio: nextProps.playerBio });
    }
    if (nextProps.isLoading !== this.state.isLoading) {
      this.setState({ isLoading: nextProps.isLoading });
    }
  }

  transformData(d) {
    let yearlyPlayoffData = [];
    let yearlyRegData = [];
    let monthlyRegData = [];
    let monthlyPlayoffData = [];

    d.reverse().forEach(
      function(data) {
        if (data.month === "year") {
          if(data.game_type === "P"){
            yearlyPlayoffData.push(data);
          } else {
            yearlyRegData.push(data);
          }
        } else {
          if(data.game_type === "P"){
            monthlyPlayoffData.push(data);
          } else {
            monthlyRegData.push(data);
          }
        }
      }
    );
    this.setState({
      yearlyPlayoffData: yearlyPlayoffData,
      yearlyRegData: yearlyRegData,
      monthlyPlayoffData: monthlyPlayoffData,
      monthlyRegData: monthlyRegData,
      dataTransformed: true,
    })
  }

  getMetricList(metric, stateObj) {
    let l = [];
    this.state[stateObj].forEach(
      function(data) {
        l.push(data[metric])
      }
    );
    return(l)
  }


  render() {
    let content = (
      <LoadingWrapper>
        <Spin tip="Loading...">
        </Spin>
      </LoadingWrapper>
    );
    if (!this.state.isLoading && this.state.dataTransformed) {
      content = (
        <div style={{width: "100%", position: "relative"}}>
          <GraphTitle>Shooting Skill</GraphTitle>
          <ShootingSkillGraph getMetricList={this.getMetricList}/>

          <GraphTitle>Shot Quality</GraphTitle>
          <ShotQualityGraph getMetricList={this.getMetricList}/>

          <GraphTitle>Shot Types</GraphTitle>
          <ShotTypesGraph getMetricList={this.getMetricList}/>
        </div>
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
    isLoading: (state.playerIsLoading || state.playerBioIsLoading),
    sidebarCollapsed: state.sidebarCollapsed,
    sidebarGone: state.sidebarGone,
    teamInfo: state.teamInfo,
    teamInfoLoading: state.teamInfoIsLoading,
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps) (withTheme(PlayerGraphs)));
