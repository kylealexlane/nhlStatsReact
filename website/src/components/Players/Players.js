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


const maxTableWidth = 1200;

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

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      width: 0,
      height: 0,
      yearSelected: '20182019',
      gametype: 'R',
      isLoading: false,
      data: [],
      sidebarWidth: this.props.sidebarCollapsed ? layout.sidebarCollapsedWidth : layout.sideBarWidth,
      depth: this.props.depth ? this.props.depth : "basicranks",
      pageNum: maintheme.DefaultNumTableItems
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleChangeGameType = this.handleChangeGameType.bind(this);
    this.pageNumChangeCallback = this.pageNumChangeCallback.bind(this);
    this.fetchPlayerData = this.fetchPlayerData.bind(this);
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
    this.props.fetchData(`http://www.api.thepuckluck.com/api/v1/players?season=${this.state.yearSelected}&gametype=${this.state.gametype}&returntype=list`);
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




  render() {

    const playersColumns = [
      'last_name',
      'first_name',
      'pos_code',
      'num_shots',
      'num_goals',
      'sum_xgoals',
      'avg_shoot_perc',
      'avg_xgoals',
      'goals_aa_per_shot',
      'mean_ang',
      'mean_dist',
      'shot_quality'
    ];

    const selectsOptions = [
      {label: "Year",
        val: "year"},
      {label: "Game Type",
        val: "gametype"},
      {label: "Items Per Page",
      val: "pagenum"}
    ];

    const defaultSelectOptions = ["year", "gametype"];

    return (
      <React.Fragment>
        <MainWrapper style={{ width: this.state.width - this.state.sidebarWidth - (layout.outerPaddingInt*2)}}>
          <TableAbove
            title={"Players"}
            subTitle={"Player shooting statistics by season and game type"}
            chooseSelects={true}
            selectsOptions={selectsOptions}
            pageNumChangeCallback={this.pageNumChangeCallback}
            defaultSelectFilters={defaultSelectOptions}
            defaultPageNum={maintheme.DefaultNumTableItems}
            selectYearCallback={this.handleChangeYear}
            selectGameTypeCallback={this.handleChangeGameType}
          />
          <Table
            pageSize={this.state.pageNum}
            cols={playersColumns}
            dataSource={this.state.data}
            scroll={{ x: maxTableWidth }}
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
    sidebarCollapsed: state.sidebarCollapsed
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (withTheme(Players)));
