import React from "react";
import styled, { withTheme } from "styled-components";
import "react-typist/dist/Typist.css";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import { Spin } from 'antd';
import {teamInfoFetchData} from "../../actions/teams";
import maintheme from "../../styles/theme";
import dataColumns from "../../utils/dataColumns"
import { Table } from "../Table";


const maxTableWidth = 1200;


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

class GoalieTables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: this.props.isLoading ? this.props.isLoading : true,
      data: [],
      yearlyPlayoffData: [],
      yearlyRegData: [],
      monthlyPlayoffData: [],
      monthlyRegData: [],
      dataTransformed: false,
      // pageNum: maintheme.DefaultNumTableItems,
      pageNum: 100,
    };
    this.transformData = this.transformData.bind(this);
    this.getMetricList = this.getMetricList.bind(this);
  }

  componentWillMount() {
    if (this.props.goalie !== this.state.data && !this.props.isLoading) {
      this.setState({ data: this.props.goalie });
      this.transformData(this.props.goalie);
    }
    if (this.props.isLoading !== this.state.isLoading) {
      this.setState({ isLoading: this.props.isLoading });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.goalie !== this.state.data && !nextProps.isLoading) {
      this.setState({ data: nextProps.goalie });
      this.transformData(nextProps.goalie);
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
    let d = this.state.yearlyRegData;
    const colWidth = this.props.isMobile ? maintheme.layout.mobileColWidth : maintheme.layout.colWidth;


    let content = (
      <LoadingWrapper>
        <Spin tip="Loading...">
        </Spin>
      </LoadingWrapper>
    );
    if (!this.state.isLoading && this.state.dataTransformed) {
      content = (
        <div style={{width: "100%", position: "relative"}}>
          <GraphTitle>Basic</GraphTitle>
          <Table
            goalieStats={true}
            pageSize={this.state.pageNum}
            cols={dataColumns.goalieBasicColumns}
            dataSource={d}
            scroll={{ x: dataColumns.goalieBasicColumns.length * colWidth }}
            loading={this.state.isLoading}
            rowKey="id"
            colWidth={colWidth}
            fixedColWidth={colWidth}
          />
          <GraphTitle>Frequencies</GraphTitle>
          <Table
            goalieStats={true}
            pageSize={this.state.pageNum}
            cols={dataColumns.goalieFreqColumns}
            dataSource={d}
            scroll={{ x: dataColumns.goalieFreqColumns.length * colWidth }}
            loading={this.state.isLoading}
            rowKey="id"
            colWidth={colWidth}
            fixedColWidth={colWidth}
          />
          <GraphTitle>Shooting Percents</GraphTitle>
          <Table
            goalieStats={true}
            pageSize={this.state.pageNum}
            cols={dataColumns.goalieShootPercColumns}
            dataSource={d}
            scroll={{ x: dataColumns.goalieShootPercColumns.length * colWidth }}
            loading={this.state.isLoading}
            rowKey="id"
            colWidth={colWidth}
            fixedColWidth={colWidth}
          />
          <GraphTitle>Actual Values</GraphTitle>
          <Table
            goalieStats={true}
            pageSize={this.state.pageNum}
            cols={dataColumns.goalieActualValsColumns}
            dataSource={d}
            scroll={{ x: dataColumns.goalieActualValsColumns.length * colWidth }}
            loading={this.state.isLoading}
            rowKey="id"
            colWidth={colWidth}
            fixedColWidth={colWidth}
          />
          <GraphTitle>Expected Values</GraphTitle>
          <Table
            pageSize={this.state.pageNum}
            goalieStats={true}
            cols={dataColumns.goalieExpectedValsColumns}
            dataSource={d}
            scroll={{ x: dataColumns.goalieExpectedValsColumns.length * colWidth }}
            loading={this.state.isLoading}
            rowKey="id"
            colWidth={colWidth}
            fixedColWidth={colWidth}
          />
          <GraphTitle>Goals</GraphTitle>
          <Table
            goalieStats={true}
            pageSize={this.state.pageNum}
            cols={dataColumns.goalieGoalDataColumns}
            dataSource={d}
            scroll={{ x: dataColumns.goalieGoalDataColumns.length * colWidth }}
            loading={this.state.isLoading}
            rowKey="id"
            colWidth={colWidth}
            fixedColWidth={colWidth}
          />
          <GraphTitle>All</GraphTitle>
          <Table
            goalieStats={true}
            pageSize={this.state.pageNum}
            cols={dataColumns.goalieAllSummariesColumns}
            dataSource={d}
            scroll={{ x: dataColumns.goalieAllSummariesColumns.length * colWidth }}
            loading={this.state.isLoading}
            rowKey="id"
            colWidth={colWidth}
            fixedColWidth={colWidth}
          />
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
    goalie: state.goalie,
    hasErrored: (state.goalieHasErrored),
    isLoading: (state.goalieIsLoading),
    sidebarCollapsed: state.sidebarCollapsed,
    sidebarGone: state.sidebarGone,
    isMobile: state.isMobileMode,
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps) (withTheme(GoalieTables)));
