import React from "react";
import styled, { withTheme } from "styled-components";
import { withRouter } from "react-router-dom";
import ReactEcharts from 'echarts-for-react';


function getGenShootingOption(props) {
  const colors = ['#f76600', '#5793f3', '#d14a61', '#675bba'];
  const numShots = props.getMetricList("num_shots", "yearlyRegData");
  const shootPerc = props.getMetricList("avg_shoot_perc", "yearlyRegData");
  const xShootPerc = props.getMetricList("avg_xgoals", "yearlyRegData");
  const sq = props.getMetricList("shot_quality", "yearlyRegData");
  const gaapers = props.getMetricList("goals_aa_per_shot", "yearlyRegData");
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
        right: '25%'
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
          data: props.getMetricList("year_code", "yearlyRegData")
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

const SaveSkillGraph = props => (
  <ReactEcharts
    notMerge={true}
    lazyUpdate={true}
    theme={"theme_name"}
    option={getGenShootingOption(props)}
  />
);

export default withRouter(withTheme(SaveSkillGraph));
