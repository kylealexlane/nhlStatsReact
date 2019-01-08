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

class PlayerTables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: this.props.isLoading? this.props.isLoading : true,
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
    if (this.props.player !== this.state.data && !this.props.isLoading) {
      this.setState({ data: this.props.player });
      this.transformData(this.props.player);
    }
    if (this.props.isLoading !== this.state.isLoading) {
      this.setState({ isLoading: this.props.isLoading });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.player !== this.state.data && !nextProps.isLoading) {
      this.setState({ data: nextProps.player });
      this.transformData(nextProps.player);
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
            pageSize={this.state.pageNum}
            cols={dataColumns.playerBasicColumns}
            dataSource={d}
            scroll={{ x: dataColumns.playerBasicColumns.length * 100 }}
            loading={this.state.isLoading}
            rowKey="id"
            colWidth={100}
            fixedColWidth={100}
          />
          <GraphTitle>Frequencies</GraphTitle>
          <Table
            pageSize={this.state.pageNum}
            cols={dataColumns.playerFreqColumns}
            dataSource={d}
            scroll={{ x: dataColumns.playerFreqColumns.length * 100 }}
            loading={this.state.isLoading}
            rowKey="id"
            colWidth={100}
            fixedColWidth={100}
          />
          <GraphTitle>Shooting Percents</GraphTitle>
          <Table
            pageSize={this.state.pageNum}
            cols={dataColumns.playerShootPercColumns}
            dataSource={d}
            scroll={{ x: dataColumns.playerShootPercColumns.length * 100 }}
            loading={this.state.isLoading}
            rowKey="id"
            colWidth={100}
            fixedColWidth={100}
          />
          <GraphTitle>Actual Values</GraphTitle>
          <Table
            pageSize={this.state.pageNum}
            cols={dataColumns.playerActualValsColumns}
            dataSource={d}
            scroll={{ x: dataColumns.playerActualValsColumns.length * 100 }}
            loading={this.state.isLoading}
            rowKey="id"
            colWidth={100}
            fixedColWidth={100}
          />
          <GraphTitle>Expected Values</GraphTitle>
          <Table
            pageSize={this.state.pageNum}
            cols={dataColumns.playerExpectedValsColumns}
            dataSource={d}
            scroll={{ x: dataColumns.playerExpectedValsColumns.length * 100 }}
            loading={this.state.isLoading}
            rowKey="id"
            colWidth={100}
            fixedColWidth={100}
          />
          <GraphTitle>Goals</GraphTitle>
          <Table
            pageSize={this.state.pageNum}
            cols={dataColumns.playerGoalDataColumns}
            dataSource={d}
            scroll={{ x: dataColumns.playerGoalDataColumns.length * 100 }}
            loading={this.state.isLoading}
            rowKey="id"
            colWidth={100}
            fixedColWidth={100}
          />
          <GraphTitle>All</GraphTitle>
          <Table
            pageSize={this.state.pageNum}
            cols={dataColumns.playerAllSummariesColumns}
            dataSource={d}
            scroll={{ x: dataColumns.playerAllSummariesColumns.length * 100 }}
            loading={this.state.isLoading}
            rowKey="id"
            colWidth={100}
            fixedColWidth={100}
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
    player: state.player,
    hasErrored: (state.playerHasErrored),
    isLoading: (state.playerIsLoading),
    sidebarCollapsed: state.sidebarCollapsed,
    sidebarGone: state.sidebarGone,
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps) (withTheme(PlayerTables)));
