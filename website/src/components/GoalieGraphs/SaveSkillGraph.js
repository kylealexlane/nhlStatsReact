import React from "react";
import styled, { withTheme } from "styled-components";
import { withRouter } from "react-router-dom";
import ReactEcharts from 'echarts-for-react';


function getGenShootingOption(props) {
  const colors = ['#f76600', '#5793f3', '#d14a61', '#675bba'];
  const numShots = props.getMetricList("num_shots", "yearlyRegData");
  const savePerc = props.getMetricList("save_perc", "yearlyRegData");
  const xsavePerc = props.getMetricList("xsave_perc", "yearlyRegData");
  const saapers = props.getMetricList("saves_aa_per_shot", "yearlyRegData");
  return(
    props.m ?
    { // Mobile mode
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
          name: 'Save %',
          min: Math.min(...xsavePerc) < .85 ? Math.min(...xsavePerc) : .85,
          max: Math.max(...xsavePerc) > .95 ? Math.max(...xsavePerc) : .95,
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
          name: 'xSave %',
          min: Math.min(...xsavePerc) < .875 ? Math.min(...xsavePerc) : .875,
          max: Math.max(...xsavePerc) > .94 ? Math.max(...xsavePerc) : .94,
          position: 'right',
          offset: 1000, // TODO: FIGURE OUT HOW TO FIX THIS HACK - THIS SUCKS
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
          min: Math.min(...saapers),
          max: Math.max(...saapers),
          position: 'right',
          offset: 1000, // TODO: FIGURE OUT HOW TO FIX THIS HACK - THIS SUCKS
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
          name:'Save %',
          type:'line',
          yAxisIndex: 1,
          data: savePerc
        },
        {
          name:'xSave %',
          type:'line',
          yAxisIndex: 2,
          data: xsavePerc
        },
        {
          name:'SavesAA/s',
          type:'line',
          yAxisIndex: 3,
          data: saapers
        }
      ]
    } :
      { // Normal non-mobile mode
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
          data:['Num Shots', 'Save %','xSave %','SavesAA/s']
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
            name: 'Save %',
            min: Math.min(...xsavePerc) < .85 ? Math.min(...xsavePerc) : .85,
            max: Math.max(...xsavePerc) > .95 ? Math.max(...xsavePerc) : .95,
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
            name: 'xSave %',
            min: Math.min(...xsavePerc) < .875 ? Math.min(...xsavePerc) : .875,
            max: Math.max(...xsavePerc) > .94 ? Math.max(...xsavePerc) : .94,
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
            min: Math.min(...saapers),
            max: Math.max(...saapers),
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
            name:'Save %',
            type:'line',
            yAxisIndex: 1,
            data: savePerc
          },
          {
            name:'xSave %',
            type:'line',
            yAxisIndex: 2,
            data: xsavePerc
          },
          {
            name:'SavesAA/s',
            type:'line',
            yAxisIndex: 3,
            data: saapers
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
