import React from "react";
import styled, { withTheme } from "styled-components";
import "react-typist/dist/Typist.css";
import { Table } from "../Table";
import maintheme from "../../styles/theme"
import { layout } from "../../styles/theme"
import { goaliesFetchData } from '../../actions/goalies';
import { connect } from 'react-redux';
import { TableAbove } from "../TableAbove";


const maxTableWidth = 1000;

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

class Goalies extends React.Component {
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
      pageNum: maintheme.DefaultNumTableItems
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleChangeGameType = this.handleChangeGameType.bind(this);
    this.pageNumChangeCallback = this.pageNumChangeCallback.bind(this);
  }

  // Functions for calculating window size on the fly and dynamically updating things
  componentDidMount() {
    document.title = "Goalies";
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.props.fetchData(`http://www.api.thepuckluck.com/api/v1/goalies?season=${this.state.yearSelected}&gametype=${this.state.gametype}&returntype=list`);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.goalies !== this.state.goalies) {
      this.setState({ data: nextProps.goalies });
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
    console.log(window.innerWidth, window.innerHeight)
  }

  // Handle changing year
  handleChangeYear(value) {
    this.setState({
      yearSelected: value}, function stateUpdateComplete() {
      this.props.fetchData(`http://www.api.thepuckluck.com/api/v1/goalies?season=${this.state.yearSelected}&gametype=${this.state.gametype}&returntype=list`);
    }.bind(this));
  };

  // Handle changing gemetype
  handleChangeGameType(value) {
    this.setState({
      gametype: value}, function stateUpdateComplete() {
      this.props.fetchData(`http://www.api.thepuckluck.com/api/v1/goalies?season=${this.state.yearSelected}&gametype=${this.state.gametype}&returntype=list`);
    }.bind(this));
  };

  // Handle changing page num
  pageNumChangeCallback(n) {
    this.setState({ pageNum: n })
  }


  render() {

    const goaliesColumns = [
      'last_name',
      'first_name',
      'pos_code',
      'num_shots',
      'num_goals',
      'sum_xgoals',
      'save_perc',
      'xsave_perc',
      'saves_aa_per_shot',
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
            title={"Goalies"}
            subTitle={"Goalie save statistics by season."}
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
            cols={goaliesColumns}
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
    fetchData: (url) => dispatch(goaliesFetchData(url))
  };
};

const mapStateToProps = (state) => {
  return {
    goalies: state.goalies,
    hasErrored: state.goaliesHasErrored,
    isLoading: state.goaliesIsLoading,
    sidebarCollapsed: state.sidebarCollapsed
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (withTheme(Goalies));
