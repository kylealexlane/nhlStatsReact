import React from "react";
import styled, { withTheme } from "styled-components";
import { withRouter } from "react-router-dom";
import ReactEcharts from 'echarts-for-react';


function getShotQualityOption(props) {
  const colors = ['#f76600', '#5793f3', '#d14a61', '#675bba'];
  // const numShots = this.getMetricList("num_shots", "yearlyRegData");
  const meanDist = props.getMetricList("mean_dist", "yearlyRegData");
  const meanAng = props.getMetricList("mean_ang", "yearlyRegData");
  const sq = props.getMetricList("shot_quality", "yearlyRegData");
  return(
    props.m ?
    { // Mobile option - simpler
      color: colors,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
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
          name: 'Shot Quality',
          min: Math.min(...sq),
          max: Math.max(...sq),
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
          name: 'Mean Dist',
          min: Math.min(...meanDist),
          max: Math.max(...meanDist),
          position: 'right',
          // offset: 1000, // TODO: FIX THIS HACK!!!!!!!!!!!!!!!
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
          offset: 1000, // TODO: FIX THIS HACK!!!!!!!!!!!!!!!
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
        {
          name:'Shot Quality',
          type:'line',
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
    } :
      { // Non mobile option - regular
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
          data:['Shot Quality', 'Mean Dist', 'Mean Ang']
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
            name: 'Shot Quality',
            min: Math.min(...sq),
            max: Math.max(...sq),
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
            name: 'Mean Dist',
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
          {
            name:'Shot Quality',
            type:'line',
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

const ShotQualityGraph = props => (
  <ReactEcharts
    notMerge={true}
    lazyUpdate={true}
    theme={"theme_name"}
    option={getShotQualityOption(props)}
  />
);

export default withRouter(withTheme(ShotQualityGraph));
