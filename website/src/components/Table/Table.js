import React from "react";
// import styled, { withTheme } from "styled-components";
import "react-typist/dist/Typist.css";
import { Table as AntTable } from "antd";
import compareByAlph from "../../functions/helpers";
import { Input, Button, Icon, Select, Layout } from "antd";
// import {layout} from "../../styles/theme";



class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: this.props.pageSize
    };
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.pageSize !== this.state.pageSize) {
      this.setState({ pageSize: nextProps.pageSize });
    }
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
    const fixedColWidth = this.props.fixedColWidth ? this.props.fixedColWidth : 100;
    const colWidth = this.props.colWidth ? this.props.colWidth : 100;

    const columns = [];
    // Names and Titles - Fixed value
    if(this.props.cols.indexOf("last_name") > -1) {
      columns.push({
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
      })
    }

    if(this.props.cols.indexOf("name") > -1) {
      columns.push({
        title: "Name",
        dataIndex: "name",
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
          record.name.toLowerCase().includes(value.toLowerCase()),
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
        sorter: (a, b) => compareByAlph(a.name, b.name),

        width: fixedColWidth,
        fixed: 'left'
      })
    }

    // Not fixed
    if(this.props.cols.indexOf("first_name") > -1) {
      columns.push({
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
          })
    }
    if(this.props.cols.indexOf("pos_code") > -1) {
      columns.push({
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
          })
    }

    if(this.props.cols.indexOf("num_shots") > -1) {
      columns.push({
            title: "Shots",
            dataIndex: "num_shots",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.num_shots - b.num_shots,
            width: colWidth
          })
    }
    if(this.props.cols.indexOf("num_goals") > -1) {
      columns.push({
        title: "Goals",
            dataIndex: "num_goals",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.num_goals - b.num_goals,
            width: colWidth
      })
    }
    if(this.props.cols.indexOf("sum_xgoals") > -1) {
      columns.push({
            title: "xGoals",
            dataIndex: "sum_xgoals",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.sum_xgoals - b.sum_xgoals,
            width: colWidth
      })
    }

    // SHOOTER STATS
    if(this.props.cols.indexOf("avg_shoot_perc") > -1) {
      columns.push({
            title: "S%",
            dataIndex: "avg_shoot_perc",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.avg_shoot_perc - b.avg_shoot_perc,
            width: colWidth
      })
    }
    if(this.props.cols.indexOf("avg_xgoals") > -1) {
      columns.push({
            title: "xS%",
            dataIndex: "avg_xgoals",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.avg_xgoals - b.avg_xgoals,
            width: colWidth
      })
    }
    if(this.props.cols.indexOf("goals_aa_per_shot") > -1) {
      columns.push({
            title: "goalsAA/s",
            dataIndex: "goals_aa_per_shot",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.goals_aa_per_shot - b.goals_aa_per_shot,
            width: colWidth
      })
    }

    // GOALIE STATS
    if(this.props.cols.indexOf("save_perc") > -1) {
      columns.push({
        title: "Save %",
        dataIndex: "save_perc",
        sorter: (a, b) => a.save_perc - b.save_perc,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("xsave_perc") > -1) {
      columns.push({
        title: "xSave %",
        dataIndex: "xsave_perc",
        sorter: (a, b) => a.xsave_perc - b.xsave_perc,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("saves_aa_per_shot") > -1) {
      columns.push({
        title: "SavesAA/s",
        dataIndex: "saves_aa_per_shot",
        sorter: (a, b) => a.saves_aa_per_shot - b.saves_aa_per_shot,
        width: colWidth
      })
    }

    // Distance and Angle stats
    if(this.props.cols.indexOf("mean_dist") > -1) {
      columns.push({
        title: "Avg Dist",
        dataIndex: "mean_dist",
        sorter: (a, b) => a.mean_dist - b.mean_dist,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("mean_ang") > -1) {
      columns.push({
        title: "Avg Angle",
        dataIndex: "mean_ang",
        sorter: (a, b) => a.mean_ang - b.mean_ang,
        width: colWidth
      })
    }

    // All
    if(this.props.cols.indexOf("shot_quality") > -1) {
      columns.push({
        title: "Shot Quality",
        dataIndex: "shot_quality",
        sorter: (a, b) => a.shot_quality - b.shot_quality,
        // width: colWidth
      })
    }

    return(
      <AntTable
        {...this.props}
        size="small"
        columns={columns}
        dataSource={this.props.dataSource}
        onChange={this.props.onChange}
        scroll={this.props.scroll}
        rowKey={this.props.rowKey}
        loading={this.props.loading}
        pagination={{
          pageSize: this.state.pageSize,
          ...this.props.pagination
        }}
      />
    )
  }
}

export default Table;
