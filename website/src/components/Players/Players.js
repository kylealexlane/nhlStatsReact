import React from "react";
import styled, { withTheme } from "styled-components";
import "react-typist/dist/Typist.css";
import { Table } from "../Table";
import maintheme from "../../styles/theme"
import { layout } from "../../styles/theme"
import { playersFetchData } from '../../actions/players';
import { connect } from 'react-redux';
import { TableAbove } from "../TableAbove";
import {withRouter} from "react-router-dom";
import dataColumns from "../../utils/dataColumns"


const maxTableWidth = 1200;

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
  background: ${props => props.theme.colors.mainBackground};
  min-height: calc(100vh - ${props => props.theme.layout.topBarHeight} - ${props => props.theme.layout.paddingVertical} * 2);
`;

class Players extends React.Component {
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
      sidebarWidth: this.props.sidebarCollapsed ? layout.sidebarCollapsedWidth : layout.sideBarWidth,
      pageNum: maintheme.DefaultNumTableItems
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleChangeGameType = this.handleChangeGameType.bind(this);
    this.pageNumChangeCallback = this.pageNumChangeCallback.bind(this);
    this.fetchPlayerData = this.fetchPlayerData.bind(this);
    this.changeSelectStatsTypeCallback = this.changeSelectStatsTypeCallback.bind(this);
    this.getCols = this.getCols.bind(this);
  }

  // Functions for calculating window size on the fly and dynamically updating things
  componentDidMount() {
    document.title = "Players";
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.fetchPlayerData();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.players !== this.state.players) {
      this.setState({ data: nextProps.players });
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

  fetchPlayerData() {
    this.props.fetchData(`http://www.api.thepuckluck.com/api/v1/players?season=${this.state.yearSelected}&gametype=${this.state.gametype}&returntype=list&depth=allsummaries`);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  // Handle changing year
  handleChangeYear(value) {
    this.setState({
      yearSelected: value}, () => {
      this.fetchPlayerData();
    });
  };

  // Handle changing gemetype
  handleChangeGameType(value) {
    this.setState({
      gametype: value}, () => {
      this.fetchPlayerData();
    });
  };

  // Handle changing page num
  pageNumChangeCallback(n) {
    this.setState({ pageNum: n })
  }

  // Handle changing
  changeSelectStatsTypeCallback(value) {
    this.setState({ statsType: value })
  }

  getCols() {
    switch(this.state.statsType) {
      case "basic":
        return(dataColumns.playersBasicColumns);
      case "freq":
        return(dataColumns.playersFreqColumns);
      case "shootpercs":
        return(dataColumns.playersShootPercColumns);
      case "goaldata":
        return(dataColumns.playersGoalDataColumns);
      case "actualvals":
        return(dataColumns.playersActualValsColumns);
      case "expectedvals":
        return(dataColumns.playersExpectedValsColumns);
      case "all":
        return(dataColumns.playersAllSummariesColumns);
      default:
        return(dataColumns.playersBasicColumns);
    }
  }


  render() {
    const cols = this.getCols();
    const opts = dataColumns.playersBasicOptions;

    const defaultopts = dataColumns.playersBasicDefaultOptions;

    // Width calculations for proper re-sizing
    let pw = this.props.sidebarGone ?
      this.state.width - (layout.outerPaddingInt*2) :
      this.state.width - this.state.sidebarWidth - (layout.outerPaddingInt*2);
    let w = (pw < maintheme.layout.maxWrapperWidthInt) ? pw : maintheme.layout.maxWrapperWidthInt;

    return (
      <React.Fragment>
        <MainWrapper style={{ width: w}}>
          <TableAbove
            title={"Players"}
            subTitle={"Player shooting statistics by season and game type"}
            chooseSelects={true}
            selectsOptions={opts}
            pageNumChangeCallback={this.pageNumChangeCallback}
            defaultSelectFilters={defaultopts}
            defaultPageNum={maintheme.DefaultNumTableItems}
            selectYearCallback={this.handleChangeYear}
            selectGameTypeCallback={this.handleChangeGameType}
            changeSelectStatsTypeCallback={this.changeSelectStatsTypeCallback}
          />
          <Table
            pageSize={this.state.pageNum}
            cols={cols}
            dataSource={this.state.data}
            scroll={{ x: cols.length * 100 }} // each column has a fixed width of 100
            loading={this.state.isLoading}
            rowKey="id"
            colWidth={100}
            fixedColWidth={100}
          />
        </MainWrapper>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(playersFetchData(url))
  };
};

const mapStateToProps = (state) => {
  return {
    players: state.players,
    hasErrored: state.playersHasErrored,
    isLoading: state.playersIsLoading,
    sidebarCollapsed: state.sidebarCollapsed,
    sidebarGone: state.sidebarGone,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (withTheme(Players)));
