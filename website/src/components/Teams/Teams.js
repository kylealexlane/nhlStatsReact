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


const maxTableWidth = 1100;

const MainWrapper = styled.div`
  align-self: center;
  margin: 0;
  width: 100%;
  height: 100%;
  max-width: calc(${maxTableWidth}px + ${props => props.theme.layout.paddingHorizontal} * 2);
  padding-top: ${props => props.theme.layout.paddingVertical};
  padding-bottom: ${props => props.theme.layout.paddingVertical};
  padding-right: ${props => props.theme.layout.paddingHorizontal};
  padding-left: ${props => props.theme.layout.paddingHorizontal};
  background: ${props => props.theme.colors.mainBackground};
  min-height: calc(100vh - ${props => props.theme.layout.topBarHeight} - ${props => props.theme.layout.paddingVertical} * 2);
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
      yearSelected: '20182019',
      gametype: 'R',
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
    this.props.fetchData(`http://www.api.thepuckluck.com/api/v1/teams?season=${this.state.yearSelected}&gametype=${this.state.gametype}&returntype=list`);
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


  render() {

    let teamsColumns = [];

    if(this.state.situation=="offensive"){
      teamsColumns = [
          'name',
          'num_shots',
          'num_goals',
          'sum_xgoals',
          'avg_shoot_perc',
          'avg_xgoals',
          'goals_aa_per_shot',
          'shot_quality',
          'mean_dist',
          'mean_ang'
        ];
    } else if (this.state.situation == "defensive"){
      teamsColumns = [
        'name',
        'num_shots',
        'num_goals',
        'sum_xgoals',
        'save_perc',
        'xsave_perc',
        'saves_aa_per_shot',
        'shot_quality',
        'mean_dist',
        'mean_ang'
      ];
    }

    const selectsOptions = [
      {label: "Year",
        val: "year"},
      {label: "Game Type",
        val: "gametype"},
      {label: "Situation",
        val: "situation"},
      {label: "Items Per Page",
        val: "pagenum"}
    ];

    const defaultSelectOptions = ["year", "gametype", "situation"];

    const subtitle = this.state.situation == "offensive" ? "Team shooting statistics by season and game type" :
      "Team save statistics by season and game type";

    return (
      <React.Fragment>
        <MainWrapper style={{ width: this.state.width - this.state.sidebarWidth - (layout.outerPaddingInt*2)}}>
          <TableAbove
            title={"Teams"}
            subTitle={subtitle}
            chooseSelects={true}
            selectsOptions={selectsOptions}
            pageNumChangeCallback={this.pageNumChangeCallback}
            defaultSelectFilters={defaultSelectOptions}
            defaultPageNum={maintheme.DefaultNumTableItems}
            selectYearCallback={this.handleChangeYear}
            selectGameTypeCallback={this.handleChangeGameType}
            selectSituationCallback={this.handleChangeSituation}
            {...this.props}
          />
          <Table
            pageSize={this.state.pageNum}
            cols={teamsColumns}
            dataSource={this.state.situation == "offensive" ? this.state.offensiveData : this.state.defensiveData}
            scroll={{ x: maxTableWidth }}
            loading={this.state.isLoading}
            rowKey="id"
            colWidth={100}
            fixedColWidth={200}
          />
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
    sidebarCollapsed: state.sidebarCollapsed
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (withTheme(Teams)));
