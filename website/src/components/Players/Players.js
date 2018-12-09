import React from "react";
import styled, { withTheme } from "styled-components";
import "react-typist/dist/Typist.css";
import { Input, Button, Icon, Select, Layout } from "antd";
import { Table } from "../Table";
import compareByAlph from "../../functions/helpers";
import mainTheme from "../../styles/theme"

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
      height: 0
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  // Functions for calculating window size on the fly and dynamically updating things
  // Should work with resizing!!!
  componentDidMount() {
    document.title = "Puckluck";
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
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
        dataIndex: "last",
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
          record.last.toLowerCase().includes(value.toLowerCase()),
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
        sorter: (a, b) => compareByAlph(a.last, b.last),

        width: fixedColWidth,
        fixed: 'left'
      },
      {
        title: "First",
        dataIndex: "first",
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
          record.first.toLowerCase().includes(value.toLowerCase()),
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
        sorter: (a, b) => compareByAlph(a.first, b.first),
        width: fixedColWidth,
        fixed: 'left'
      },
      {
        title: "Pos",
        dataIndex: "pos",
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
        sorter: (a, b) => compareByAlph(a.pos, b.pos),
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
        dataIndex: "shots",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.shots - b.shots,
        width: colWidth
      },
      {
        title: "Goals",
        dataIndex: "goals",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.goals - b.goals,
        width: colWidth
      },
      {
        title: "kxGoals",
        dataIndex: "kxgoals",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.kxgoals - b.kxgoals,
        width: colWidth
      },
      {
        title: "S%",
        dataIndex: "sperc",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.sperc - b.sperc,
        width: colWidth
      },
      {
        title: "kxS%",
        dataIndex: "kxsperc",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.kxsperc - b.kxsperc,
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
        dataIndex: "shotquality",
        sorter: (a, b) => a.shotquality - b.shotquality,
        // width: colWidth
      }
    ];
    return (
      <React.Fragment>
        <MainWrapper style={{ width: this.state.width - mainTheme.sideBarWidth - 48}}>
          <Header>
            <h1>Players</h1>
            <Dropdowns />
          </Header>
          <Table
            columns={columns}
            dataSource={data}
            onChange={onChange}
            scroll={{ x: maxTableWidth }}
          />
        </MainWrapper>
      </React.Fragment>
    );
  }
}

export default withTheme(Players);
