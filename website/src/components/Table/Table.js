import React from "react";
import styled, { withTheme } from "styled-components";
import "react-typist/dist/Typist.css";
import { Table as AntTable } from "antd";
import compareByAlph from "../../functions/helpers";
import { Input, Button, Icon } from "antd";
import {Link, withRouter} from "react-router-dom";

// TODO: Check if there is cleaner way to do this.. hard to manage with the customizability I want with this table and the functions the options need

const StyledLink = styled(Link)`
  color: ${props => props.theme.colors.linkColor}
`;

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: this.props.pageSize
    };
    this.linkTo = this.linkTo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
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

  linkTo(id){
    return(this.props.goalieStats ? `/goalies/${id}` : `/players/${id}`)
  }

  render() {
    const fixedColWidth = this.props.fixedColWidth ? this.props.fixedColWidth : 100;
    const colWidth = this.props.colWidth ? this.props.colWidth : 100;


    const columns = [];
    // These are fixed - either last_name, name, or month/year
    // Last name - fixed
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
            style={{ color: filtered ? "#f76600" : "#aaa" }}
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
        render: (text, record) => {
          const { searchText } = this.state;
          return searchText ? (
            <span>
              {text
                .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, "i"))
                .map(
                  (fragment, i) =>
                    fragment.toLowerCase() === searchText.toLowerCase() ? (
                      <StyledLink to={this.linkTo(record.id)}>
                        <span key={i} className="highlight">
                        {fragment}
                        </span>
                      </StyledLink>
                    ) : (
                      fragment
                    ) // eslint-disable-line
                )}
            </span>
          ) : (
            <StyledLink to={this.linkTo(record.id)}>{text}</StyledLink>
          );
        },
        sorter: (a, b) => compareByAlph(a.last_name, b.last_name),

        width: fixedColWidth,
        fixed: 'left',
      })
    }

    // Name (generally team names) - fixed
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
            style={{ color: filtered ? "#f76600" : "#aaa" }}
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
        render: (text, record) => {
          const { searchText } = this.state;
          return searchText ? (
            <span>
              {text
                .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, "i"))
                .map(
                  (fragment, i) =>
                    fragment.toLowerCase() === searchText.toLowerCase() ? (
                      <span key={i} className="highlight">
                        fragment
                        {/*<StyledLink to={`/teams/${record.id}`}>{fragment}</StyledLink>*/}
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

    // year
    if(this.props.cols.indexOf("year") > -1) {
      columns.push({
        title: "Year",
        dataIndex: "year_code",
        defaultSortOrder: "descend",
        sorter: (a, b) => compareByAlph(a.year_code, b.year_code),
        render: (text, record) => (
          <span>
            {text.toString().slice(0, 4) + "-" + text.toString().slice(4)}
          </span>
        ),
        width: fixedColWidth,
        fixed: 'left',
      })
    }
    // month
    if(this.props.cols.indexOf("month") > -1) {
      columns.push({
        title: "Month",
        dataIndex: "month",
        defaultSortOrder: "descend",
        sorter: (a, b) => compareByAlph(a.month, b.month),
        render: (text, record) => (
          <span>
            {text}
          </span>
        ),
        width: fixedColWidth,
        fixed: 'left',
      })
    }







    // Not fixed //

    // First name
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
                style={{ color: filtered ? "#f76600" : "#aaa" }}
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
            render: (text, record) => {
              const { searchText } = this.state;
              return searchText ? (
                <span>
                  {text
                    .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, "i"))
                    .map(
                      (fragment, i) =>
                        fragment.toLowerCase() === searchText.toLowerCase() ? (
                          <span key={i} className="highlight">
                            <StyledLink to={this.linkTo(record.id)}>{fragment}</StyledLink>
                          </span>
                        ) : (
                          fragment
                        ) // eslint-disable-line
                    )}
                </span>
              ) : (
                <StyledLink to={this.linkTo(record.id)}>{text}</StyledLink>
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



    // Num shots stats
    if(this.props.cols.indexOf("num_shots") > -1) {
      columns.push({
            title: "Shots",
            dataIndex: "num_shots",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.num_shots - b.num_shots,
            width: colWidth
          })
    }
    if(this.props.cols.indexOf("wrist_shot_num") > -1) {
      columns.push({
        title: "Wrist Shots",
        dataIndex: "wrist_shot_num",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.wrist_shot_num - b.wrist_shot_num,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("slap_shot_num") > -1) {
      columns.push({
        title: "Slap Shots",
        dataIndex: "slap_shot_num",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.slap_shot_num - b.slap_shot_num,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("snap_shot_num") > -1) {
      columns.push({
        title: "Snap Shots",
        dataIndex: "snap_shot_num",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.snap_shot_num - b.snap_shot_num,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("backhand_num") > -1) {
      columns.push({
        title: "Backhands",
        dataIndex: "backhand_num",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.backhand_num - b.backhand_num,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("tip_in_num") > -1) {
      columns.push({
        title: "Tipped Shots",
        dataIndex: "tip_in_num",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.tip_in_num - b.tip_in_num,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("deflected_num") > -1) {
      columns.push({
        title: "Deflected Shots",
        dataIndex: "deflected_num",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.deflected_num - b.deflected_num,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("wrap_around_num") > -1) {
      columns.push({
        title: "Wrap Arounds",
        dataIndex: "wrap_around_num",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.wrap_around_num - b.wrap_around_num,
        width: colWidth
      })
    }





    // Num goals stats
    if(this.props.cols.indexOf("num_goals") > -1) {
      columns.push({
        title: "Goals",
            dataIndex: "num_goals",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.num_goals - b.num_goals,
            width: colWidth
      })
    }
    if(this.props.cols.indexOf("num_goals_wrist_shot") > -1) {
      if(this.props.goalieStats) {
        columns.push({
          title: "Wrist Shot Goals",
          key: "num_goals_wrist_shot",
          // dataIndex: "num_goals",
          defaultSortOrder: "descend",
          sorter: (a, b) => (a.wrist_shot_num * (1 - a.wrist_shot_save_perc)) - (b.wrist_shot_num * (1 - b.wrist_shot_save_perc)),
          width: colWidth,
          render: (text, record) => (
            <span>
            {Math.round(record.wrist_shot_num * (1- record.wrist_shot_save_perc))}
          </span>
          ),
        })
      } else {
        columns.push({
          title: "Wrist Shot Goals",
          key: "num_goals_wrist_shot",
          // dataIndex: "num_goals",
          defaultSortOrder: "descend",
          sorter: (a, b) => (a.wrist_shot_num * a.wrist_shot_shooting_perc) - (b.wrist_shot_num * b.wrist_shot_shooting_perc),
          width: colWidth,
          render: (text, record) => (
            <span>
            {Math.round(record.wrist_shot_num * record.wrist_shot_shooting_perc)}
          </span>
          ),
        })
      }
    }
    if(this.props.cols.indexOf("num_goals_slap_shot") > -1) {
      if(this.props.goalieStats) {
        columns.push({
          title: "Slap Shot Goals",
          key: "num_goals_slap_shot",
          // dataIndex: "num_goals",
          defaultSortOrder: "descend",
          sorter: (a, b) => (a.slap_shot_num *  (1 - a.slap_shot_save_perc)) - (b.slap_shot_num * (1 - b.slap_shot_save_perc)),
          width: colWidth,
          render: (text, record) => (
            <span>
            {Math.round(record.slap_shot_num * (1 - record.slap_shot_save_perc))}
          </span>
          ),
        })
      } else {
        columns.push({
          title: "Slap Shot Goals",
          key: "num_goals_slap_shot",
          // dataIndex: "num_goals",
          defaultSortOrder: "descend",
          sorter: (a, b) => (a.slap_shot_num * a.slap_shot_shooting_perc) - (b.slap_shot_num * b.slap_shot_shooting_perc),
          width: colWidth,
          render: (text, record) => (
            <span>
            {Math.round(record.slap_shot_num * record.slap_shot_shooting_perc)}
          </span>
          ),
        })
      }
    }
    if(this.props.cols.indexOf("num_goals_snap_shot") > -1) {
      if(this.props.goalieStats) {
        columns.push({
          title: "Snap Shot Goals",
          key: "num_goals_snap_shot",
          defaultSortOrder: "descend",
          sorter: (a, b) => (a.snap_shot_num * (1 - a.snap_shot_save_perc)) - (b.snap_shot_num * (1 - b.snap_shot_save_perc)),
          width: colWidth,
          render: (text, record) => (
            <span>
            {Math.round(record.snap_shot_num * (1 - record.snap_shot_save_perc))}
          </span>
          ),
        })
      } else {
        columns.push({
          title: "Snap Shot Goals",
          key: "num_goals_snap_shot",
          defaultSortOrder: "descend",
          sorter: (a, b) => (a.snap_shot_num * a.snap_shot_shooting_perc) - (b.snap_shot_num * b.snap_shot_shooting_perc),
          width: colWidth,
          render: (text, record) => (
            <span>
            {Math.round(record.snap_shot_num * record.snap_shot_shooting_perc)}
          </span>
          ),
        })
      }
    }
    if(this.props.cols.indexOf("num_goals_backhand") > -1) {
      if(this.props.goalieStats) {
        columns.push({
          title: "Backhand Goals",
          key: "num_goals_backhand",
          defaultSortOrder: "descend",
          sorter: (a, b) => (a.backhand_num * (1 - a.backhand_save_perc)) - (b.backhand_num * (1 - b.backhand_save_perc)),
          width: colWidth,
          render: (text, record) => (
            <span>
            {Math.round(record.backhand_num * (1 - record.backhand_save_perc))}
          </span>
          ),
        })
      } else {
        columns.push({
          title: "Backhand Goals",
          key: "num_goals_backhand",
          defaultSortOrder: "descend",
          sorter: (a, b) => (a.backhand_num * a.backhand_shooting_perc) - (b.backhand_num * b.backhand_shooting_perc),
          width: colWidth,
          render: (text, record) => (
            <span>
            {Math.round(record.backhand_num * record.backhand_shooting_perc)}
          </span>
          ),
        })
      }
    }
    if(this.props.cols.indexOf("num_goals_tip_in") > -1) {
      if(this.props.goalieStats) {
        columns.push({
          title: "Tipped Goals",
          key: "num_goals_tip_in",
          defaultSortOrder: "descend",
          sorter: (a, b) => (a.tip_in_num * (1 - a.tip_in_save_perc)) - (b.tip_in_num * (1 - b.tip_in_save_perc)),
          width: colWidth,
          render: (text, record) => (
            <span>
            {Math.round(record.tip_in_num * (1 - record.tip_in_save_perc))}
          </span>
          ),
        })
      } else {
        columns.push({
          title: "Tipped Goals",
          key: "num_goals_tip_in",
          defaultSortOrder: "descend",
          sorter: (a, b) => (a.tip_in_num * a.tip_in_shooting_perc) - (b.tip_in_num * b.tip_in_shooting_perc),
          width: colWidth,
          render: (text, record) => (
            <span>
            {Math.round(record.tip_in_num * record.tip_in_shooting_perc)}
          </span>
          ),
        })
      }
    }
    if(this.props.cols.indexOf("num_goals_deflected") > -1) {
      if(this.props.goalieStats) {
        columns.push({
          title: "Deflected Goals",
          key: "num_goals_deflected",
          defaultSortOrder: "descend",
          sorter: (a, b) => (a.deflected_num * (1 - a.deflected_save_perc)) - (b.deflected_num * (1 - b.deflected_save_perc)),
          width: colWidth,
          render: (text, record) => (
            <span>
            {Math.round(record.deflected_num * (1 - record.deflected_save_perc))}
          </span>
          ),
        })
      } else{
        columns.push({
          title: "Deflected Goals",
          key: "num_goals_deflected",
          defaultSortOrder: "descend",
          sorter: (a, b) => (a.deflected_num * a.deflected_shooting_perc) - (b.deflected_num * b.deflected_shooting_perc),
          width: colWidth,
          render: (text, record) => (
            <span>
            {Math.round(record.deflected_num * record.deflected_shooting_perc)}
          </span>
          ),
        })
      }
    }
    if(this.props.cols.indexOf("num_goals_wrap_around") > -1) {
      if(this.props.goalieStats) {
        columns.push({
          title: "Wrap Around Goals",
          key: "num_goals_wrap_around",
          defaultSortOrder: "descend",
          sorter: (a, b) => (a.wrap_around_num * (1 - a.wrap_around_save_perc)) - (b.wrap_around_num * (1 - b.wrap_around_save_perc)),
          width: colWidth,
          render: (text, record) => (
            <span>
            {Math.round(record.wrap_around_num * (1 - record.wrap_around_save_perc))}
          </span>
          ),
        })
      } else {
        columns.push({
          title: "Wrap Around Goals",
          key: "num_goals_wrap_around",
          defaultSortOrder: "descend",
          sorter: (a, b) => (a.wrap_around_num * a.wrap_around_shooting_perc) - (b.wrap_around_num * b.wrap_around_shooting_perc),
          width: colWidth,
          render: (text, record) => (
            <span>
            {Math.round(record.wrap_around_num * record.wrap_around_shooting_perc)}
          </span>
          ),
        })
      }
    }





    // xGoals stats
    if(this.props.cols.indexOf("sum_xgoals") > -1) {
      columns.push({
            title: "xGoals",
            dataIndex: "sum_xgoals",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.sum_xgoals - b.sum_xgoals,
            width: colWidth
      })
    }
    if(this.props.cols.indexOf("wrist_shot_pred") > -1) {
      columns.push({
        title: "xGoals Wrist Shot",
        dataIndex: "wrist_shot_pred",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.wrist_shot_pred - b.wrist_shot_pred,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("slap_shot_pred") > -1) {
      columns.push({
        title: "xGoals Slap Shot",
        dataIndex: "slap_shot_pred",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.slap_shot_pred - b.slap_shot_pred,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("snap_shot_pred") > -1) {
      columns.push({
        title: "xGoals Snap Shot",
        dataIndex: "snap_shot_pred",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.snap_shot_pred - b.snap_shot_pred,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("backhand_pred") > -1) {
      columns.push({
        title: "xGoals Backhand",
        dataIndex: "backhand_pred",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.backhand_pred - b.backhand_pred,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("tip_in_pred") > -1) {
      columns.push({
        title: "xGoals Tipped",
        dataIndex: "tip_in_pred",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.tip_in_pred - b.tip_in_pred,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("deflected_pred") > -1) {
      columns.push({
        title: "xGoals Deflected",
        dataIndex: "deflected_pred",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.deflected_pred - b.deflected_pred,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("wrap_around_pred") > -1) {
      columns.push({
        title: "xGoals Wrap Around",
        dataIndex: "wrap_around_pred",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.wrap_around_pred - b.wrap_around_pred,
        width: colWidth
      })
    }




    // Frequency shooting stats
    if(this.props.cols.indexOf("wrist_shot_freq") > -1) {
      columns.push({
        title: "Freq Wrist Shot",
        dataIndex: "wrist_shot_freq",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.wrist_shot_freq - b.wrist_shot_freq,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("slap_shot_freq") > -1) {
      columns.push({
        title: "Freq Slap Shot",
        dataIndex: "slap_shot_freq",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.slap_shot_freq - b.slap_shot_freq,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("snap_shot_freq") > -1) {
      columns.push({
        title: "Freq Snap Shot",
        dataIndex: "snap_shot_freq",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.snap_shot_freq - b.snap_shot_freq,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("backhand_freq") > -1) {
      columns.push({
        title: "Freq Backhand",
        dataIndex: "backhand_freq",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.backhand_freq - b.backhand_freq,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("tip_in_freq") > -1) {
      columns.push({
        title: "Freq Tipped",
        dataIndex: "tip_in_freq",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.tip_in_freq - b.tip_in_freq,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("deflected_freq") > -1) {
      columns.push({
        title: "Freq Deflected",
        dataIndex: "deflected_freq",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.deflected_freq - b.deflected_freq,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("wrap_around_freq") > -1) {
      columns.push({
        title: "Freq Wrap Around",
        dataIndex: "wrap_around_freq",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.wrap_around_freq - b.wrap_around_freq,
        width: colWidth
      })
    }






    // Shooting percent
    if(this.props.cols.indexOf("avg_shoot_perc") > -1) {
      columns.push({
            title: "S%",
            dataIndex: "avg_shoot_perc",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.avg_shoot_perc - b.avg_shoot_perc,
            width: colWidth
      })
    }
    if(this.props.cols.indexOf("wrist_shot_shooting_perc") > -1) {
      columns.push({
        title: "S% Wrist Shot",
        dataIndex: "wrist_shot_shooting_perc",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.wrist_shot_shooting_perc - b.wrist_shot_shooting_perc,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("slap_shot_shooting_perc") > -1) {
      columns.push({
        title: "S% Slap Shot",
        dataIndex: "slap_shot_shooting_perc",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.slap_shot_shooting_perc - b.slap_shot_shooting_perc,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("snap_shot_shooting_perc") > -1) {
      columns.push({
        title: "S% Snap Shot",
        dataIndex: "snap_shot_shooting_perc",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.snap_shot_shooting_perc - b.snap_shot_shooting_perc,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("backhand_shooting_perc") > -1) {
      columns.push({
        title: "S% Backhand",
        dataIndex: "backhand_shooting_perc",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.backhand_shooting_perc - b.backhand_shooting_perc,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("tip_in_shooting_perc") > -1) {
      columns.push({
        title: "S% Tipped",
        dataIndex: "tip_in_shooting_perc",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.tip_in_shooting_perc - b.tip_in_shooting_perc,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("deflected_shooting_perc") > -1) {
      columns.push({
        title: "S% Deflected",
        dataIndex: "deflected_shooting_perc",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.deflected_shooting_perc - b.deflected_shooting_perc,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("deflected_shooting_perc") > -1) {
      columns.push({
        title: "S% Wrap Around",
        dataIndex: "wrap_around_shooting_perc",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.wrap_around_shooting_perc - b.wrap_around_shooting_perc,
        width: colWidth
      })
    }





    // Save percent
    if(this.props.cols.indexOf("save_perc") > -1) {
      columns.push({
        title: "Save%",
        dataIndex: "save_perc",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.save_perc - b.save_perc,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("wrist_shot_save_perc") > -1) {
      columns.push({
        title: "Save% Wrist Shot",
        dataIndex: "wrist_shot_save_perc",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.wrist_shot_save_perc - b.wrist_shot_save_perc,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("slap_shot_save_perc") > -1) {
      columns.push({
        title: "Save% Slap Shot",
        dataIndex: "slap_shot_save_perc",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.slap_shot_save_perc - b.slap_shot_save_perc,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("snap_shot_save_perc") > -1) {
      columns.push({
        title: "Save% Snap Shot",
        dataIndex: "snap_shot_save_perc",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.snap_shot_save_perc - b.snap_shot_save_perc,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("backhand_save_perc") > -1) {
      columns.push({
        title: "Save% Backhand",
        dataIndex: "backhand_save_perc",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.backhand_save_perc - b.backhand_save_perc,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("tip_in_save_perc") > -1) {
      columns.push({
        title: "Save% Tipped",
        dataIndex: "tip_in_save_perc",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.tip_in_save_perc - b.tip_in_save_perc,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("deflected_save_perc") > -1) {
      columns.push({
        title: "Save% Deflected",
        dataIndex: "deflected_save_perc",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.deflected_save_perc - b.deflected_save_perc,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("deflected_save_perc") > -1) {
      columns.push({
        title: "Save% Wrap Around",
        dataIndex: "wrap_around_save_perc",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.wrap_around_save_perc - b.wrap_around_save_perc,
        width: colWidth
      })
    }





    // xShooting percent stats
    if(this.props.cols.indexOf("avg_xgoals") > -1) {
      columns.push({
            title: "xS%",
            dataIndex: "avg_xgoals",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.avg_xgoals - b.avg_xgoals,
            width: colWidth
      })
    }
    if(this.props.cols.indexOf("avg_xgoals_wrist_shot") > -1) {
      columns.push({
        title: "xS% Wrist Shot",
        dataIndex: "avg_xgoals_wrist_shot",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.avg_xgoals_wrist_shot - b.avg_xgoals_wrist_shot,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("avg_xgoals_slap_shot") > -1) {
      columns.push({
        title: "xS% Slap Shot",
        dataIndex: "avg_xgoals_slap_shot",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.avg_xgoals_slap_shot - b.avg_xgoals_slap_shot,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("avg_xgoals_snap_shot") > -1) {
      columns.push({
        title: "xS% Snap Shot",
        dataIndex: "avg_xgoals_snap_shot",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.avg_xgoals_snap_shot - b.avg_xgoals_snap_shot,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("avg_xgoals_backhand") > -1) {
      columns.push({
        title: "xS% Backhand",
        dataIndex: "avg_xgoals_backhand",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.avg_xgoals_backhand - b.avg_xgoals_backhand,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("avg_xgoals_tip_in") > -1) {
      columns.push({
        title: "xS% Tipped",
        dataIndex: "avg_xgoals_tip_in",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.avg_xgoals_tip_in - b.avg_xgoals_tip_in,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("avg_xgoals_deflected") > -1) {
      columns.push({
        title: "xS% Deflected",
        dataIndex: "avg_xgoals_deflected",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.avg_xgoals_deflected - b.avg_xgoals_deflected,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("avg_xgoals_wrap_around") > -1) {
      columns.push({
        title: "xS% Wrap Around",
        dataIndex: "avg_xgoals_wrap_around",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.avg_xgoals_wrap_around - b.avg_xgoals_wrap_around,
        width: colWidth
      })
    }







    // xSave percent Stats
    if(this.props.cols.indexOf("xsave_perc") > -1) {
      columns.push({
        title: "xSave%",
        dataIndex: "xsave_perc",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.xsave_perc - b.xsave_perc,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("xsave_perc_wrist_shot") > -1) {
      columns.push({
        title: "xSave% Wrist Shot",
        dataIndex: "xsave_perc_wrist_shot",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.xsave_perc_wrist_shot - b.xsave_perc_wrist_shot,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("xsave_perc_slap_shot") > -1) {
      columns.push({
        title: "xSave% Slap Shot",
        dataIndex: "xsave_perc_slap_shot",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.xsave_perc_slap_shot - b.xsave_perc_slap_shot,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("xsave_perc_snap_shot") > -1) {
      columns.push({
        title: "xSave% Snap Shot",
        dataIndex: "xsave_perc_snap_shot",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.xsave_perc_snap_shot - b.xsave_perc_snap_shot,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("xsave_perc_backhand") > -1) {
      columns.push({
        title: "xSave% Backhand",
        dataIndex: "xsave_perc_backhand",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.xsave_perc_backhand - b.xsave_perc_backhand,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("xsave_perc_tip_in") > -1) {
      columns.push({
        title: "xSave% Tipped",
        dataIndex: "xsave_perc_tip_in",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.xsave_perc_tip_in - b.xsave_perc_tip_in,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("xsave_perc_deflected") > -1) {
      columns.push({
        title: "xSave% Deflected",
        dataIndex: "xsave_perc_deflected",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.xsave_perc_deflected - b.xsave_perc_deflected,
        width: colWidth
      })
    }
    if(this.props.cols.indexOf("xsave_perc_wrap_around") > -1) {
      columns.push({
        title: "xS% Wrap Around",
        dataIndex: "xsave_perc_wrap_around",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.xsave_perc_wrap_around - b.xsave_perc_wrap_around,
        width: colWidth
      })
    }






    // Goals above average per shot
    if(this.props.cols.indexOf("goals_aa_per_shot") > -1) {
      columns.push({
            title: "GoalsAA/s",
            dataIndex: "goals_aa_per_shot",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.goals_aa_per_shot - b.goals_aa_per_shot,
            width: colWidth
      })
    }
    // saves above average per shot
    if(this.props.cols.indexOf("saves_aa_per_shot") > -1) {
      columns.push({
        title: "SavesAA/s",
        dataIndex: "saves_aa_per_shot",
        sorter: (a, b) => a.saves_aa_per_shot - b.saves_aa_per_shot,
        width: colWidth
      })
    }





    // Distance and Angle stats
    // average distance
    if(this.props.cols.indexOf("mean_dist") > -1) {
      columns.push({
        title: "Avg Dist",
        dataIndex: "mean_dist",
        sorter: (a, b) => a.mean_dist - b.mean_dist,
        width: colWidth
      })
    }
    // average angle
    if(this.props.cols.indexOf("mean_ang") > -1) {
      columns.push({
        title: "Avg Angle",
        dataIndex: "mean_ang",
        sorter: (a, b) => a.mean_ang - b.mean_ang,
        width: colWidth
      })
    }

    // All - flexible to fit table
    // Shot quality
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
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {this.props.rowClick ? this.props.rowClick(record.id) : null }, // click row
            onContextMenu: event => {}, // right button click row
            onMouseEnter: event => {}, // mouse enter row
            onMouseLeave: event => {}, // mouse leave row
          };
        }}
        rowClassName={this.props.rowClick ? "clickable-row" : "not-clickable-row"}
        loading={this.props.loading}
        pagination={{
          pageSize: this.state.pageSize,
          ...this.props.pagination
        }}
      />
    )
  }
}

export default withRouter((withTheme(Table)));
