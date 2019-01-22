import React from "react";
import styled, { withTheme } from "styled-components";
import { withRouter } from "react-router-dom";
import ReactEcharts from 'echarts-for-react';
import {connect} from "react-redux";
import {playersFetchData} from "../../actions/players";


function getOptions(props) {
  const colors = ['#f76600', '#5793f3', '#d14a61', '#675bba'];
  console.log("props data: ", props.data);
  console.log("props : ", props);

  // const numShots = props.getMetricList("num_shots", "yearlyRegData");
  // const shootPerc = props.getMetricList("avg_shoot_perc", "yearlyRegData");
  // const xShootPerc = props.getMetricList("avg_xgoals", "yearlyRegData");
  // const sq = props.getMetricList("shot_quality", "yearlyRegData");
  // const gaapers = props.getMetricList("goals_aa_per_shot", "yearlyRegData");
  const xAxisName = props.xAxisName ? props.xAxisName : props.xAxis;
  const yAxisName = props.yAxisName ? props.yAxisName : props.yAxis;
  const colourMetricName = props.colourMetricName ? props.colourMetricName : props.colourMetric;
  const legendArray =  props.parseByForward ? ['Defense', 'Center', 'Left Wing', 'Right Wing'] : ["All"];

  return(
    {
      // title : {
      //   text: props.title,
      //   // subtext: '抽样调查来自: Heinz  2003'
      // },
      grid: {
        left: '3%',
        right: '7%',
        bottom: '3%',
        containLabel: true
      },
      tooltip : {
        // trigger: 'axis',
        showDelay : 0,
        formatter : function (params) {
          console.log("params", params);
          return params.data[3] + '<br/>'
            + colourMetricName + ' :' + params.data[2] + '<br/>'
            + yAxisName + ' :' + params.data[1] + ' <br/>'
            + xAxisName + ' :' + params.data[0] + ' <br/>';
        },
        axisPointer:{
          show: true,
          type : 'cross',
          lineStyle: {
            type : 'dashed',
            width : 1
          }
        }
      },
      toolbox: {
        feature: props.isMobile ? {} : {
          dataZoom: {},
          brush: {
            type: ['rect', 'clear']
          }
        }
      },
      brush: {
      },
      legend: {
        data: legendArray,
        left: 'center'
      },
      xAxis : [
        {
          type : 'value',
          scale:true,
          axisLabel : {
            formatter: props.isMobile ? '{value}' : '{value} ' + xAxisName
          },
          splitLine: {
            show: false
          }
        }
      ],
      yAxis : [
        {
          type : 'value',
          scale:true,
          axisLabel : {
            formatter: props.isMobile ? '{value}' : '{value} ' + yAxisName
          },
          splitLine: {
            show: false
          }
        }
      ],
      series : [
        {
          name:'All',
          type:'scatter',
          data: props.data,
          symbolSize: 5,
          itemStyle: {
            normal: {
              color: colors[0],
              borderWidth: 1,
              label : {
                show: true,
                position: 'top',
                formatter: function(data){
                  return data['data'][3];
                }
              }
            }
          },
        },
        {
          name:'Defense',
          type:'scatter',
          data: props.dData,
          symbolSize: 5,
          itemStyle: {
            normal: {
              color: colors[0],
              borderWidth: 1,
              label : {
                show: true,
                position: 'top',
                formatter: function(data){
                  return data['data'][3];
                }
              }
            }
          },
        },
        {
          name:'Center',
          type:'scatter',
          data: props.cData,
          symbolSize: 5,
          itemStyle: {
            normal: {
              color: colors[1],
              borderWidth: 1,
              label : {
                show: true,
                position: 'top',
                formatter: function(data){
                  return data['data'][3];
                }
              }
            }
          },
        },
        {
          name:'Left Wing',
          type:'scatter',
          data: props.lwData,
          symbolSize: 5,
          itemStyle: {
            normal: {
              color: colors[2],
              borderWidth: 1,
              label : {
                show: true,
                position: 'top',
                formatter: function(data){
                  return data['data'][3];
                }
              }
            }
          },
        },
        {
          name:'Right Wing',
          type:'scatter',
          data: props.rwData,
          symbolSize: 5,
          itemStyle: {
            normal: {
              color: colors[3],
              borderWidth: 1,
              label : {
                show: true,
                position: 'top',
                formatter: function(data){
                  return data['data'][3];
                }
              }
            }
          },
        },
      ]
    }
  );
}

const ScatterPlot = props => (
  <ReactEcharts
    style={{ height: "90vh", width: "100%"}}
    notMerge={true}
    lazyUpdate={true}
    option={getOptions(props)}
  />
);

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const mapStateToProps = (state) => {
  return {
    isMobile: state.isMobileMode,
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps) (withTheme(ScatterPlot)));
