import React from "react";
import styled, { withTheme } from "styled-components";
import "react-typist/dist/Typist.css";
import { Input, Button, Icon, Select, Layout } from "antd";
import { Table } from "../Table";
import compareByAlph from "../../functions/helpers";
import mainTheme from "../../styles/theme"
import { playersFetchData } from '../../actions/players';
import { connect } from 'react-redux';



const maxTableWidth = 1000;

const Header = styled.header`
  margin-bottom: 24px;
  ${props => props.theme.flex.flexRowJustifyStart};
  width: 100%;
  flex-wrap: wrap;
`;

const SelectDiv = styled.div`
  color: ${props => props.theme.colors.mainText};
  font-size: ${props => props.theme.fontSize.subHeading};
  margin: 0;
  padding-left: 24px;
  flex: 0;
`;

const MainWrapper = styled.div`
  margin: 0;
  width: 100%;
  max-width: ${maxTableWidth}px
  margin-bottom: 24px;
  // align-self: center;
  // position: relative;
  // border: 1px solid #ebedf0;;
  // padding-top: 42px;
  // padding-right: 24px;
  // padding-bottom: 50px;
  // padding-left: 24px;
  // zoom: 1
`;

const data = [
  {
    key: "1",
    first: "Patrice",
    last: "Bergeron",
    pos: "C",
    yearstart: "2017",
    yearend: "2018",
    shots: "211",
    goals: "31",
    kxgoals: "24.5",
    sperc: "11.12",
    kxsperc: "9.83",
    kxss: "1.98",
    shotquality: "1.32"
  },
  {
    key: "2",
    first: "Connor",
    last: "Mcdavid",
    pos: "C",
    yearstart: "2016",
    yearend: "2017",
    shots: "322",
    goals: "45",
    kxgoals: "37.5",
    sperc: "11.12",
    kxsperc: "9.83",
    kxss: "1.98",
    shotquality: "1.32"
  },
  {
    key: "3",
    first: "Mikko",
    last: "Rantenan",
    pos: "R",
    yearstart: "2017",
    yearend: "2018",
    shots: "211",
    goals: "31",
    kxgoals: "24.5",
    sperc: "11.12",
    kxsperc: "9.83",
    kxss: "1.98",
    shotquality: "1.32"
  },
  {
    key: "4",
    first: "Austin",
    last: "Matthews",
    pos: "C",
    yearstart: "2016",
    yearend: "2017",
    shots: "211",
    goals: "31",
    kxgoals: "24.5",
    sperc: "11.12",
    kxsperc: "9.83",
    kxss: "1.98",
    shotquality: "1.32"
  },
  {
    key: "5",
    first: "John",
    last: "Tavares",
    pos: "C",
    yearstart: "2017",
    yearend: "2018",
    shots: "211",
    goals: "31",
    kxgoals: "24.5",
    sperc: "11.12",
    kxsperc: "9.83",
    kxss: "1.98",
    shotquality: "1.32"
  }
];

function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

const fixedColWidth = 100;
const colWidth = 100;


const Dropdowns = () => {
  const Option = Select.Option;
  function handleChangeYear(value) {
    console.log(`selected ${value}`);
  }

  function handleChangePlayoff(value) {
    console.log(`selected ${value}`);
  }
  return (
    <React.Fragment>
      <SelectDiv>
        <Select
          defaultValue="2018"
          style={{ width: 160 }}
          onChange={handleChangeYear}
        >
          <Option value="2011">2011-2012</Option>
          <Option value="2012">2012-2013</Option>
          <Option value="2013">2013-2014</Option>
          <Option value="2014">2014-2015</Option>
          <Option value="2015">2015-2016</Option>
          <Option value="2016">2016-2017</Option>
          <Option value="2017">2017-2018</Option>
          <Option value="2018">2018-2019</Option>
        </Select>
      </SelectDiv>
      <SelectDiv>
        <Select
          defaultValue="0"
          style={{ width: 160 }}
          onChange={handleChangePlayoff}
        >
          <Option value="0">Regular Season</Option>
          <Option value="1">Playoffs</Option>
        </Select>
      </SelectDiv>
    </React.Fragment>
  );
};

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      width: 0,
      height: 0,
      data: []
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  // Functions for calculating window size on the fly and dynamically updating things
  componentDidMount() {
    document.title = "Players";
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.props.fetchData('http://www.api.thepuckluck.com/api/v1/players?season=20182019&gametype=R&returntype=list');
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.players !== this.state.players) {
      this.setState({ data: nextProps.players });
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


  render() {
    const columns = [
      {
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
        onFilter: (value, record) => record.pos.indexOf(value) === 0,
        defaultSortOrder: "descend",
        sorter: (a, b) => compareByAlph(a.pos_code, b.pos_code),
        width: colWidth
      },
      //   {
      //   title: 'Year Start',
      //   dataIndex: 'yearstart',
      //   defaultSortOrder: 'descend',
      //   sorter: (a, b) => a.yearstart - b.yearstart,
      // }, {
      //   title: 'Year End',
      //   dataIndex: 'yearend',
      //   defaultSortOrder: 'descend',
      //   sorter: (a, b) => a.yearend - b.yearend,
      // },
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
        title: "kxSS",
        dataIndex: "kxss",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.kxss - b.kxss,
        width: colWidth
      },
      {
        title: "Shot Quality",
        dataIndex: "shot_quality",
        sorter: (a, b) => a.shot_quality - b.shot_quality,
        // width: colWidth
      }
    ];
    // if (this.props.hasErrored) {
    //   return <p>Sorry! There was an error loading the items</p>;
    // }
    // if (this.props.isLoading) {
    //   return <p>Loading…</p>;
    // }
    // return (
    //   <ul>
    //     {this.props.players.map((players) => (
    //       <li key={players.id}>
    //         {players.label}
    //       </li>
    //     ))}
    //   </ul>
    // );
    return (
      <React.Fragment>
        <MainWrapper style={{ width: this.state.width - mainTheme.sideBarWidth - 48}}>
          <Header>
            <h1>Players</h1>
            <Dropdowns />
          </Header>
          <Table
            columns={columns}
            dataSource={this.state.data}
            onChange={onChange}
            scroll={{ x: maxTableWidth }}
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
    isLoading: state.playersIsLoading
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (withTheme(Players));
