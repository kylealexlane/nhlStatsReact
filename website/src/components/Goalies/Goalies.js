import React from "react";
import styled, { withTheme } from "styled-components";
import "react-typist/dist/Typist.css";
import { Table } from "../Table";
import maintheme from "../../styles/theme"
import { layout } from "../../styles/theme"
import { goaliesFetchData } from '../../actions/goalies';
import { connect } from 'react-redux';
import { TableAbove } from "../TableAbove";
import {withRouter} from "react-router-dom";
import dataColumns from "../../utils/dataColumns"
import { PlayersGraphs } from "../PlayersGraphs"
import { metricsLabels } from "../../utils/lookups"


const MainWrapper = styled.div`
  align-self: center;
  margin: 0;
  width: 100%;
  height: 100%;
  max-width: ${props => props.theme.layout.maxWrapperWidthInt}px;
  padding-top: ${props => props.theme.layout.paddingVertical};
  padding-bottom: ${props => props.theme.layout.paddingVertical};
  padding-right: ${props => props.theme.layout.paddingHorizontal};
  padding-left: ${props => props.theme.layout.paddingHorizontal};
  background: ${props => props.theme.colors.mainBackground}; d
  min-height: calc(100vh - ${props => props.theme.layout.topBarHeight} - ${props => props.theme.layout.paddingVertical} * 2);
`;

class Goalies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      width: 0,
      height: 0,
      yearSelected: '20182019',
      gametype: 'R',
      statsType: 'basic',
      isLoading: false,
      data: [],
      xAxis: "xsave_perc",
      xAxisName: "xSave%",
      yAxis: "save_perc",
      yAxisName: "Save%",
      colourMetric: "num_shots",
      colourMetricName: "Shots",
      nameMetric: "last_name",
      minMetric: "num_shots",
      minMetricValue: maintheme.defaultMinShotsGraph,
      chart: false,
      sidebarWidth: this.props.sidebarCollapsed ? layout.sidebarCollapsedWidth : layout.sideBarWidth,
      pageNum: maintheme.DefaultNumTableItems
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleChangeGameType = this.handleChangeGameType.bind(this);
    this.pageNumChangeCallback = this.pageNumChangeCallback.bind(this);
    this.fetchGoalieData = this.fetchGoalieData.bind(this);
    this.changeSelectStatsTypeCallback = this.changeSelectStatsTypeCallback.bind(this);
    this.minShotsChangeCallback = this.minShotsChangeCallback.bind(this);
    this.changeXAxisCallback = this.changeXAxisCallback.bind(this);
    this.changeYAxisCallback = this.changeYAxisCallback.bind(this);
    this.getCols = this.getCols.bind(this);
    this.getOpts = this.getOpts.bind(this);
    this.getDefaultOpts = this.getDefaultOpts.bind(this);
  }

  // Functions for calculating window size on the fly and dynamically updating things
  componentDidMount() {
    document.title = "Goalies";
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.fetchGoalieData();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.goalies !== this.state.goalies) {
      this.setState({ data: nextProps.goalies });
    }
    if (nextProps.chart !== this.state.chart) {
      this.setState({ chart: nextProps.chart });
    }
    if (nextProps.isLoading !== this.state.isLoading) {
      this.setState({ isLoading: nextProps.isLoading });
    }
    if (nextProps.sidebarCollapsed !== this.state.sidebarCollapsed) {
      this.setState({
        sidebarCollapsed: nextProps.sidebarCollapsed,
        sidebarWidth: nextProps.sidebarCollapsed ? layout.sidebarCollapsedWidth : layout.sideBarWidth
      });
    }
  }

  fetchGoalieData() {
    this.props.fetchData(`https://www.api.thepuckluck.com/api/v1/goalies?season=${this.state.yearSelected}&gametype=${this.state.gametype}&returntype=list&depth=allsummaries`);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  // Handle changing year
  handleChangeYear(value) {
    this.setState({
      yearSelected: value}, () => {
      this.fetchGoalieData();
    });
  };

  // Handle changing gemetype
  handleChangeGameType(value) {
    this.setState({
      gametype: value}, () => {
      this.fetchGoalieData();
    });
  };

  // Handle changing page num
  pageNumChangeCallback(n) {
    this.setState({ pageNum: n })
  }

  // Handle changing stats type
  changeSelectStatsTypeCallback(value) {
    this.setState({ statsType: value })
  }

  //Handle changing min shots
  minShotsChangeCallback(n){
    this.setState({ minMetricValue: n })
  }

  // Handle change of X axis
  changeXAxisCallback(value){
    this.setState({ xAxis: value, xAxisName: metricsLabels[value] })
  }

  // handle change of Y axis
  changeYAxisCallback(value){
    this.setState({ yAxis: value, yAxisName: metricsLabels[value] })
  }

  getCols() {
    switch(this.state.statsType) {
      case "basic":
        return(dataColumns.goaliesBasicColumns);
      case "freq":
        return(dataColumns.goaliesFreqColumns);
      case "savepercs":
        return(dataColumns.goaliesShootPercColumns);
      case "goaldata":
        return(dataColumns.goaliesGoalDataColumns);
      case "actualvals":
        return(dataColumns.goaliesActualValsColumns);
      case "expectedvals":
        return(dataColumns.goaliesExpectedValsColumns);
      case "all":
        return(dataColumns.goaliesAllSummariesColumns);
      default:
        return(dataColumns.goaliesBasicColumns);
    }
  }

  getOpts() {
    let opts =[];
    if(this.state.chart) {
      opts= dataColumns.goaliesBasicOptionsGraph;
    } else {
      opts = dataColumns.playersBasicOptions;
    }
    return opts;
  }

  getDefaultOpts() {
    let optsDef =[];
    if(this.state.chart) {
      optsDef= dataColumns.goaliesBasicDefaultOptionsGraph;
    } else {
      optsDef = dataColumns.playersBasicDefaultOptions;
    }
    return optsDef;
  }


  render() {
    const cols = this.getCols();
    const opts = this.getOpts();
    const defaultopts = this.getDefaultOpts();
    const colWidth = this.props.isMobile ? maintheme.layout.mobileColWidth : maintheme.layout.colWidth;

    // Width calculations for proper re-sizing
    let pw = this.props.sidebarGone ?
      this.state.width - (layout.outerPaddingInt*2) :
      this.state.width - this.state.sidebarWidth - (layout.outerPaddingInt*2);
    let w = (pw < maintheme.layout.maxWrapperWidthInt) ? pw : maintheme.layout.maxWrapperWidthInt;

    return (
      <React.Fragment>
        <MainWrapper style={{ width: w}}>
          <TableAbove
            title={"Goalies"}
            subTitle={"Goalie save statistics by season and game type"}
            goalieStats={true}
            chooseSelects={true}
            selectsOptions={opts}
            pageNumChangeCallback={this.pageNumChangeCallback}
            defaultSelectFilters={defaultopts}
            defaultPageNum={maintheme.DefaultNumTableItems}
            selectYearCallback={this.handleChangeYear}
            selectGameTypeCallback={this.handleChangeGameType}
            changeSelectStatsTypeCallback={this.changeSelectStatsTypeCallback}
            minShotsChangeCallback={this.minShotsChangeCallback}
            changeXAxisCallback={this.changeXAxisCallback}
            changeYAxisCallback={this.changeYAxisCallback}
          />
          {this.state.chart ?
            <PlayersGraphs
              style={{height: "100%"}}
              // minHeight={this.props.isMobile ? 700 : 1000}
              dataSource={this.state.data}
              loading={this.state.isLoading}
              yAxis={this.state.yAxis}
              yAxisName={this.state.yAxisName}
              xAxis={this.state.xAxis}
              xAxisName={this.state.xAxisName}
              colourMetric={this.state.colourMetric}
              colourMetricName={this.state.colourMetricName}
              nameMetric={this.state.nameMetric}
              minMetric={this.state.minMetric}
              minMetricValue={this.state.minMetricValue}
              parseByForward={false}
            /> :
            <Table
              goalieStats={true}
              pageSize={this.state.pageNum}
              cols={cols}
              dataSource={this.state.data}
              scroll={{x: cols.length * colWidth}}
              loading={this.state.isLoading}
              rowKey="id"
              colWidth={colWidth}
              fixedColWidth={colWidth}
            />
          }
        </MainWrapper>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(goaliesFetchData(url))
  };
};

const mapStateToProps = (state) => {
  return {
    goalies: state.goalies,
    hasErrored: state.goaliesHasErrored,
    isLoading: state.goaliesIsLoading,
    sidebarCollapsed: state.sidebarCollapsed,
    sidebarGone: state.sidebarGone,
    isMobile: state.isMobileMode,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (withTheme(Goalies)));
