import React from "react";
import styled, { withTheme } from "styled-components";
import "react-typist/dist/Typist.css";
import { Input, Button, Icon, Select, Layout } from "antd";
import { Table } from "../Table";
import compareByAlph from "../../functions/helpers";
import mainTheme from "../../styles/theme"
import { layout } from "../../styles/theme"
import { playersFetchData } from '../../actions/players';
import { connect } from 'react-redux';
import { TableAbove } from "../TableAbove";


const fixedColWidth = 100;
const colWidth = 100;
const maxTableWidth = 1000;


const MainWrapper = styled.div`
  margin: 0;
  width: 100%;
  height: 100%;
  max-width: ${maxTableWidth}px
  margin-bottom: 24px;
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
      sidebarWidth: this.props.sidebarCollapsed ? layout.sidebarCollapsedWidth : layout.sideBarWidth
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleChangeGameType = this.handleChangeGameType.bind(this);
  }

  // Functions for calculating window size on the fly and dynamically updating things
  componentDidMount() {
    document.title = "Players";
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.props.fetchData(`http://www.api.thepuckluck.com/api/v1/players?season=${this.state.yearSelected}&gametype=${this.state.gametype}&returntype=list`);
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

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    console.log(window.innerWidth, window.innerHeight)
  }

  // Handle searches for data
  handleSearch = (selectedKeys, confirm) => () => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };
  // Handle reset for data
  handleReset = clearFilters => () => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  // Handle changing year
  handleChangeYear(value) {
    this.setState({
      yearSelected: value}, function stateUpdateComplete() {
      this.props.fetchData(`http://www.api.thepuckluck.com/api/v1/players?season=${this.state.yearSelected}&gametype=${this.state.gametype}&returntype=list`);
    }.bind(this));
  };

  // Handle changing gemetype
  handleChangeGameType(value) {
    this.setState({
      gametype: value}, function stateUpdateComplete() {
      this.props.fetchData(`http://www.api.thepuckluck.com/api/v1/players?season=${this.state.yearSelected}&gametype=${this.state.gametype}&returntype=list`);
      }.bind(this));
  };


  render() {
    const columns = [
      {
        // key: "id",
        title: "Last",
        dataIndex: "last_name",
        defaultSortOrder: "descend",
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters
        }) => (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => (this.searchInput = ele)}
              placeholder="Search name"
              value={selectedKeys[0]}
              onChange={e =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={this.handleSearch(selectedKeys, confirm)}
            />
            <Button
              type="primary"
              onClick={this.handleSearch(selectedKeys, confirm)}
            >
              Search
            </Button>
            <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
          </div>
        ),
        filterIcon: filtered => (
          <Icon
            type="filter"
            style={{ color: filtered ? "#108ee9" : "#aaa" }}
          />
        ),
        onFilter: (value, record) =>
          record.last_name.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            });
          }
        },
        render: text => {
          const { searchText } = this.state;
          return searchText ? (
            <span>
              {text
                .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, "i"))
                .map(
                  (fragment, i) =>
                    fragment.toLowerCase() === searchText.toLowerCase() ? (
                      <span key={i} className="highlight">
                        {fragment}
                      </span>
                    ) : (
                      fragment
                    ) // eslint-disable-line
                )}
            </span>
          ) : (
            text
          );
        },
        sorter: (a, b) => compareByAlph(a.last_name, b.last_name),

        width: fixedColWidth,
        fixed: 'left'
      },
      {
        // key: "id",
        title: "First",
        dataIndex: "first_name",
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters
        }) => (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => (this.searchInput = ele)}
              placeholder="Search name"
              value={selectedKeys[0]}
              onChange={e =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={this.handleSearch(selectedKeys, confirm)}
            />
            <Button
              type="primary"
              onClick={this.handleSearch(selectedKeys, confirm)}
            >
              Search
            </Button>
            <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
          </div>
        ),
        filterIcon: filtered => (
          <Icon
            type="filter"
            style={{ color: filtered ? "#108ee9" : "#aaa" }}
          />
        ),
        onFilter: (value, record) =>
          record.first_name.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            });
          }
        },
        render: text => {
          const { searchText } = this.state;
          return searchText ? (
            <span>
              {text
                .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, "i"))
                .map(
                  (fragment, i) =>
                    fragment.toLowerCase() === searchText.toLowerCase() ? (
                      <span key={i} className="highlight">
                        {fragment}
                      </span>
                    ) : (
                      fragment
                    ) // eslint-disable-line
                )}
            </span>
          ) : (
            text
          );
        },
        sorter: (a, b) => compareByAlph(a.first_name, b.first_name),
        width: colWidth,
        // fixed: 'left'
      },
      {
        // key: "id",
        title: "Pos",
        dataIndex: "pos_code",
        filters: [
          {
            text: "C",
            value: "C"
          },
          {
            text: "R",
            value: "R"
          },
          {
            text: "L",
            value: "L"
          },
          {
            text: "D",
            value: "D"
          }
        ],
        filterIcon: filtered => (
          <Icon
            type="filter"
            style={{ color: filtered ? "#108ee9" : "#aaa" }}
          />
        ),
        onFilter: (value, record) => record.pos_code.indexOf(value) === 0,
        defaultSortOrder: "descend",
        sorter: (a, b) => compareByAlph(a.pos_code, b.pos_code),
        width: colWidth
      },
      {
        title: "Shots",
        dataIndex: "num_shots",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.num_shots - b.num_shots,
        width: colWidth
      },
      {
        title: "Goals",
        dataIndex: "num_goals",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.num_goals - b.num_goals,
        width: colWidth
      },
      {
        title: "xGoals",
        dataIndex: "sum_xgoals",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.sum_xgoals - b.sum_xgoals,
        width: colWidth
      },
      {
        title: "S%",
        dataIndex: "avg_shoot_perc",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.avg_shoot_perc - b.avg_shoot_perc,
        width: colWidth
      },
      {
        title: "xS%",
        dataIndex: "avg_xgoals",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.avg_xgoals - b.avg_xgoals,
        width: colWidth
      },
      {
        title: "goalsAA/s",
        dataIndex: "goals_aa_per_shot",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.goals_aa_per_shot - b.goals_aa_per_shot,
        width: colWidth
      },
      {
        title: "Shot Quality",
        dataIndex: "shot_quality",
        sorter: (a, b) => a.shot_quality - b.shot_quality,
        // width: colWidth
      }
    ];

    return (
      <React.Fragment>
        <MainWrapper style={{ width: this.state.width - this.state.sidebarWidth - (layout.paddingInt * 2)}}>
          <TableAbove
            title={"Players"}
            selectYear={true}
            selectYearCallback={this.handleChangeYear}
            selectGameType={true}
            selectGameTypeCallback={this.handleChangeGameType}
          />
          <Table
            pagination={{
              pageSize: 15
            }}
            columns={columns}
            dataSource={this.state.data}
            scroll={{ x: maxTableWidth }}
            loading={this.state.isLoading}
            rowKey="id"
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

export default connect(mapStateToProps, mapDispatchToProps) (withTheme(Players));
