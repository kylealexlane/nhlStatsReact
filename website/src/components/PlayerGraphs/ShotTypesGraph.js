import React from "react";
import styled, { withTheme } from "styled-components";
import { withRouter } from "react-router-dom";
import ReactEcharts from 'echarts-for-react';


function getShotTypeOption(props) {
  const colors = ['#f76600', '#5793f3', '#d14a61', '#675bba'];
  const wristShotFreq = props.getMetricList("wrist_shot_freq", "yearlyRegData");
  const snapShotFreq = props.getMetricList("snap_shot_freq", "yearlyRegData");
  const slapShotFreq = props.getMetricList("slap_shot_freq", "yearlyRegData");
  const backhandShotFeq = props.getMetricList("backhand_freq", "yearlyRegData");
  const wrapShotFreq = props.getMetricList("wrap_around_freq", "yearlyRegData");
  const tipShotFreq = props.getMetricList("tip_in_freq", "yearlyRegData");
  const deflectedShotFreq = props.getMetricList("deflected_freq", "yearlyRegData");
  const tipDeflectedShotFreq = tipShotFreq.map(function (num, idx) {
    return Math.round((num + deflectedShotFreq[idx]) * 1000) / 1000;
  });

  return(
    {
      // title: {
      //   text: 'Shot Types'
      // },
      tooltip : {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data:['Wrist Shot Freq','Snap Shot Freq','Slap Shot Freq', 'Backhand Freq', 'Wrap Around Freq', 'Tipped / Deflected Freq' ]
      },
      toolbox: {
        feature: {
          dataView: {show: true, readOnly: false},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      grid: {
        right: '25%'
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data: props.getMetricList("year_code", "yearlyRegData")
        }
      ],
      yAxis : [
        {
          type : 'value',
          min: 0,
          max: 1,
          axisLine: {
            lineStyle: {
              color: colors[0]
            }
          },
        }
      ],
      series : [
        // {
        //   name:'Deflected Freq',
        //   type:'line',
        //   stack: '总量',
        //   label: {
        //     normal: {
        //       show: true,
        //       position: 'top'
        //     }
        //   },
        //   areaStyle: {normal: {}},
        //   data:deflectedShotFreq
        // },
        {
          name:'Tipped / Deflected Freq',
          type:'line',
          stack: '总量',
          // label: {
          //   normal: {
          //     show: true,
          //     position: 'top'
          //   }
          // },
          areaStyle: {normal: {}},
          data:tipDeflectedShotFreq
        },
        {
          name:'Wrap Around Freq',
          type:'line',
          stack: '总量',
          // label: {
          //   normal: {
          //     show: true,
          //     position: 'top'
          //   }
          // },
          areaStyle: {normal: {}},
          data:wrapShotFreq
        },
        {
          name:'Backhand Freq',
          type:'line',
          stack: '总量',
          color: colors[3],
          // label: {
          //   normal: {
          //     show: true,
          //     position: 'top'
          //   }
          // },
          areaStyle: {normal: {}},
          data:backhandShotFeq
        },
        {
          name:'Slap Shot Freq',
          type:'line',
          stack: '总量',
          color: colors[2],
          // label: {
          //   normal: {
          //     show: true,
          //     position: 'top'
          //   }
          // },
          areaStyle: {},
          data: slapShotFreq
        },
        {
          name:'Snap Shot Freq',
          type:'line',
          stack: '总量',
          color: colors[1],
          // label: {
          //   normal: {
          //     show: true,
          //     position: 'top'
          //   }
          // },
          areaStyle: {},
          data: snapShotFreq
        },
        {
          name:'Wrist Shot Freq',
          type:'line',
          stack: '总量',
          color: colors[0],
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: {},
          data: wristShotFreq
        }
      ]
    }
  )
}

const ShotTypesGraph = props => (
  <ReactEcharts
    notMerge={true}
    lazyUpdate={true}
    theme={"theme_name"}
    option={getShotTypeOption(props)}
  />
);

export default withRouter(withTheme(ShotTypesGraph));
