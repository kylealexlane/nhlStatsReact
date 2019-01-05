import React from "react";
import styled, { withTheme } from "styled-components";
import "react-typist/dist/Typist.css";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import { Spin } from 'antd';
import {teamInfoFetchData} from "../../actions/teams";
import ReactEcharts from 'echarts-for-react';


const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;


class PlayerGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: this.props.isLoading? this.props.isLoading : true,
      data: [],
      bio: [],
      yearlyPlayoffData: [],
      yearlyRegData: [],
      monthlyPlayoffData: [],
      monthlyRegData: [],
      dataTransformed: false,
    };
    this.getGenShootingOption = this.getGenShootingOption.bind(this);
    this.getShotQualityOption = this.getShotQualityOption.bind(this);
    this.transformData = this.transformData.bind(this);
    this.getMetricList = this.getMetricList.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log("player graph next props", nextProps);
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.player !== this.state.data && !nextProps.isLoading) {
      this.setState({ data: nextProps.player });
      this.transformData(nextProps.player);
    }
    if (nextProps.playerBio !== this.state.bio && !nextProps.isLoading) {
      this.setState({ bio: nextProps.playerBio });
    }
    if (nextProps.isLoading !== this.state.isLoading) {
      this.setState({ isLoading: nextProps.isLoading });
    }
  }

  transformData(d) {
    console.log("transfroming...");

    let yearlyPlayoffData = [];
    let yearlyRegData = [];

    let monthlyRegData = [];
    let monthlyPlayoffData = [];

    d.reverse().forEach(
      function(data) {
        if (data.month === "year") {
          if(data.game_type === "P"){
            yearlyPlayoffData.push(data);
          } else {
            yearlyRegData.push(data);
          }
        } else {
          if(data.game_type === "P"){
            monthlyPlayoffData.push(data);
          } else {
            monthlyRegData.push(data);
          }
        }
      }
    );
    this.setState({
      yearlyPlayoffData: yearlyPlayoffData,
      yearlyRegData: yearlyRegData,
      monthlyPlayoffData: monthlyPlayoffData,
      monthlyRegData: monthlyRegData,
      dataTransformed: true,
    })
  }

  getMetricList(metric, stateObj) {
    let l = [];
    this.state[stateObj].forEach(
      function(data) {
        l.push(data[metric])
      }
    );
    console.log("l", l);
    return(l)
  }

  getGenShootingOption(){
    const colors = ['#f76600', '#5793f3', '#d14a61', '#675bba'];
    const numShots = this.getMetricList("num_shots", "yearlyRegData");
    const shootPerc = this.getMetricList("avg_shoot_perc", "yearlyRegData");
    const xShootPerc = this.getMetricList("avg_xgoals", "yearlyRegData");
    const sq = this.getMetricList("shot_quality", "yearlyRegData");
    const gaapers = this.getMetricList("goals_aa_per_shot", "yearlyRegData");
    return(
      {
        color: colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          right: '20%'
        },
        toolbox: {
          feature: {
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        legend: {
          data:['Num Shots', 'Shooting %','xShooting %','GoalsAA/s']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: this.getMetricList("year_code", "yearlyRegData")
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Num Shots',
            min: 0,
            max: Math.max(...numShots),
            position: 'left',
            axisLine: {
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: 'Shooting %',
            min: 0,
            max: 0.25,
            position: 'right',
            axisLine: {
              lineStyle: {
                color: colors[1]
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: 'xShooting %',
            min: 0,
            max: 0.25,
            position: 'right',
            offset: 80,
            axisLine: {
              lineStyle: {
                color: colors[2]
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: 'GoalsAA/s',
            min: Math.min(...gaapers),
            max: Math.max(...gaapers),
            position: 'right',
            offset: 160,
            axisLine: {
              lineStyle: {
                color: colors[3]
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name:'Shots',
            type:'bar',
            data: numShots
          },
          {
            name:'Shooting %',
            type:'line',
            yAxisIndex: 1,
            data: shootPerc
          },
          {
            name:'xShooting %',
            type:'line',
            yAxisIndex: 2,
            data: xShootPerc
          },
          {
            name:'GoalsAA/s',
            type:'line',
            yAxisIndex: 3,
            data: gaapers
          }
        ]
      }
  );
  }

  getShotQualityOption() {
    const colors = ['#f76600', '#5793f3', '#d14a61', '#675bba'];
    // const numShots = this.getMetricList("num_shots", "yearlyRegData");
    const meanDist = this.getMetricList("mean_dist", "yearlyRegData");
    const meanAng = this.getMetricList("mean_ang", "yearlyRegData");
    const sq = this.getMetricList("shot_quality", "yearlyRegData");
    return(
      {
        color: colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          right: '20%'
        },
        toolbox: {
          feature: {
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        legend: {
          data:['Shot Quality', 'Mean Dist', 'Mean Ang']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: this.getMetricList("year_code", "yearlyRegData")
          }
        ],
        yAxis: [
          // {
          //   type: 'value',
          //   name: 'Num Shots',
          //   min: 0,
          //   max: Math.max(...numShots),
          //   position: 'left',
          //   axisLine: {
          //     lineStyle: {
          //       color: colors[0]
          //     }
          //   },
          //   axisLabel: {
          //     formatter: '{value}'
          //   }
          // },
          {
            type: 'value',
            name: 'Shot Quality',
            min: Math.min(...sq),
            max: Math.max(...sq),
            position: 'left',
            // offset: 160,
            axisLine: {
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: 'meanDist',
            min: Math.min(...meanDist),
            max: Math.max(...meanDist),
            position: 'right',
            axisLine: {
              lineStyle: {
                color: colors[1]
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: 'Mean Ang',
            min: Math.min(...meanAng),
            max: Math.max(...meanAng),
            position: 'right',
            offset: 80,
            axisLine: {
              lineStyle: {
                color: colors[2]
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          // {
          //   name:'Shots',
          //   type:'bar',
          //   data: numShots
          // },
          {
            name:'Shot Quality',
            type:'line',
            // yAxisIndex: 3,
            data: sq
          },
          {
            name:'Mean Dist',
            type:'line',
            yAxisIndex: 1,
            data: meanDist
          },
          {
            name:'Mean Ang',
            type:'line',
            yAxisIndex: 2,
            data: meanAng
          }
        ]
      }
    );  }

  render() {
    let content = (
      <LoadingWrapper>
        <Spin tip="Loading...">
        </Spin>
      </LoadingWrapper>
    );
    if (!this.state.isLoading && this.state.dataTransformed) {
      content = (
        <div style={{width: "100%", position: "relative"}}>
          <ReactEcharts
            notMerge={true}
            lazyUpdate={true}
            theme={"theme_name"}
            option={this.getGenShootingOption()}
          />
          <ReactEcharts
            notMerge={true}
            lazyUpdate={true}
            theme={"theme_name"}
            option={this.getShotQualityOption()}
          />
        </div>


      );
    }

    return (
      <React.Fragment>
        {content}
      </React.Fragment>
    )}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTeamInfo: (url) => dispatch(teamInfoFetchData(url)),
  };
};

const mapStateToProps = (state) => {
  return {
    player: state.player,
    playerBio: state.playerBio,
    hasErrored: (state.playerHasErrored || state.playerBioHasErrored),
    isLoading: (state.playerIsLoading|| state.playerBioIsLoading),
    sidebarCollapsed: state.sidebarCollapsed,
    sidebarGone: state.sidebarGone,
    teamInfo: state.teamInfo,
    teamInfoLoading: state.teamInfoIsLoading,
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps) (withTheme(PlayerGraph)));
