import React from "react";
import styled, { withTheme } from "styled-components";
import "react-typist/dist/Typist.css";
import { Table } from "../Table";
import maintheme from "../../styles/theme"
import { layout } from "../../styles/theme"
import { teamsFetchData } from '../../actions/teams';
import { connect } from 'react-redux';
import { TableAbove } from "../TableAbove";
import {withRouter} from "react-router-dom";
import dataColumns from "../../utils/dataColumns"


const maxTableWidth = 1100;

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

const TableWrapper = styled.div`
  max-width: calc(${maxTableWidth}px);
`;

class Teams extends React.Component {
  constructor(props) {
    super(props);
    let s = "offensive";
    if (this.props.location.state) {
      s =  this.props.location.state.situation
    }
    this.state = {
      searchText: "",
      width: 0,
      height: 0,
      yearSelected: '20192020',
      gametype: 'R',
      statsType: 'basic',
      isLoading: false,
      offensiveData: [],
      defensiveData: [],
      sidebarWidth: this.props.sidebarCollapsed ? layout.sidebarCollapsedWidth : layout.sideBarWidth,
      pageNum: maintheme.DefaultNumTableItems,
      situation: s
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleChangeGameType = this.handleChangeGameType.bind(this);
    this.pageNumChangeCallback = this.pageNumChangeCallback.bind(this);
    this.handleChangeSituation = this.handleChangeSituation.bind(this);
    this.fetchTeamData = this.fetchTeamData.bind(this);
    this.changeSelectStatsTypeCallback = this.changeSelectStatsTypeCallback.bind(this);
    this.getCols = this.getCols.bind(this);
  }

  // Functions for calculating window size on the fly and dynamically updating things
  componentDidMount() {
    document.title = "Teams";
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.fetchTeamData();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.teams.team_for_stats !== this.state.offensiveData) {
      this.setState({ offensiveData: nextProps.teams.team_for_stats });
    }
    if (nextProps.teams.team_against_stats !== this.state.defensiveData) {
      this.setState({ defensiveData: nextProps.teams.team_against_stats });
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

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  fetchTeamData() {
    this.props.fetchData(`https://www.api.thepuckluck.com/api/v1/teams?season=${this.state.yearSelected}&gametype=${this.state.gametype}&returntype=list&depth=allsummaries`);
  }

  // Handle changing year
  handleChangeYear(value) {
    this.setState({
      yearSelected: value}, () => {
      this.fetchTeamData();
    });
  };

  // Handle changing gemetype
  handleChangeGameType(value) {
    this.setState({
      gametype: value}, ()=> {
      this.fetchTeamData();
    });
  };

  // Hande changing situation (offensive or defensive)
  handleChangeSituation(value) {
    this.setState({
      situation: value
    })
  }

  // Handle changing page num
  pageNumChangeCallback(n) {
    this.setState({ pageNum: n })
  }

  // Handle changing stats type
  changeSelectStatsTypeCallback(value) {
    this.setState({ statsType: value })
  }

  getCols() {
    if(this.state.situation === "offensive"){
      switch(this.state.statsType) {
        case "basic":
          return(dataColumns.teamsOffensiveBasicColumns);
        case "freq":
          return(dataColumns.teamsOffensiveFreqColumns);
        case "shootpercs":
          return(dataColumns.teamsOffensiveShootPercColumns);
        case "goaldata":
          return(dataColumns.teamsOffensiveGoalDataColumns);
        case "actualvals":
          return(dataColumns.teamsOffensiveActualValsColumns);
        case "expectedvals":
          return(dataColumns.teamsOffensiveExpectedValsColumns);
        case "all":
          return(dataColumns.teamsOffensiveAllSummariesColumns);
        default:
          return(dataColumns.teamsOffensiveBasicColumns);
      }
    } else {
      switch(this.state.statsType) {
        case "basic":
          return(dataColumns.teamsDefensiveBasicColumns);
        case "freq":
          return(dataColumns.teamsDefensiveFreqColumns);
        case "savepercs":
          return(dataColumns.teamsDefensiveShootPercColumns);
        case "goaldata":
          return(dataColumns.teamsDefensiveGoalDataColumns);
        case "actualvals":
          return(dataColumns.teamsDefensiveActualValsColumns);
        case "expectedvals":
          return(dataColumns.teamsDefensiveExpectedValsColumns);
        case "all":
          return(dataColumns.teamsDefensiveAllSummariesColumns);
        default:
          return(dataColumns.teamsDefensiveBasicColumns);
      }
    }
  }


  render() {
    const o = this.state.situation === "offensive";

    const cols = this.getCols();
    const opts = o ? dataColumns.teamsOffensiveOptions : dataColumns.teamsDefensiveOptions;
    const colWidth = this.props.isMobile ? maintheme.layout.mobileColWidth : maintheme.layout.colWidth;

    const defaultopts = o ? dataColumns.teamsOffensiveDefaultOptions : dataColumns.teamsDefensiveDefaultOptions;

    const subtitle = o ? "Team shooting statistics by season and game type" :
      "Team save statistics by season and game type";

    const title = o ? "Teams - Offensive" : "Teams - Defensive";

    // Width calculations for proper re-sizing
    let pw = this.props.sidebarGone ?
      this.state.width - (layout.outerPaddingInt*2) :
      this.state.width - this.state.sidebarWidth - (layout.outerPaddingInt*2);
    let w = (pw < maintheme.layout.maxWrapperWidthInt) ? pw : maintheme.layout.maxWrapperWidthInt;

    return (
      <React.Fragment>
        <MainWrapper style={{ width: w}}>
          <TableAbove
            title={title}
            subTitle={subtitle}
            chooseSelects={true}
            selectsOptions={opts}
            pageNumChangeCallback={this.pageNumChangeCallback}
            defaultSelectFilters={defaultopts}
            defaultPageNum={maintheme.DefaultNumTableItems}
            selectYearCallback={this.handleChangeYear}
            selectGameTypeCallback={this.handleChangeGameType}
            selectSituationCallback={this.handleChangeSituation}
            changeSelectStatsTypeCallback={this.changeSelectStatsTypeCallback}
            {...this.props}
          />
          <TableWrapper>
            <Table
              goalieStats={!o}
              pageSize={this.state.pageNum}
              cols={cols}
              dataSource={o ? this.state.offensiveData : this.state.defensiveData}
              scroll={{ x: (cols.length * colWidth) + colWidth }} // Extra for the fixed column at the start being 200 width
              loading={this.state.isLoading}
              rowKey="id"
              colWidth={colWidth}
              fixedColWidth={colWidth*1.5}
            />
          </TableWrapper>
        </MainWrapper>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(teamsFetchData(url))
  };
};

const mapStateToProps = (state) => {
  return {
    teams: state.teams,
    hasErrored: state.teamsHasErrored,
    isLoading: state.teamsIsLoading,
    sidebarCollapsed: state.sidebarCollapsed,
    sidebarGone: state.sidebarGone,
    isMobile: state.isMobileMode,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (withTheme(Teams)));
