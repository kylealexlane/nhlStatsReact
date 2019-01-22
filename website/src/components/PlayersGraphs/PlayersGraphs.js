import React from "react";
import styled, { withTheme } from "styled-components";
import "react-typist/dist/Typist.css";
import {withRouter} from "react-router-dom";
import { Spin } from 'antd';
import { ScatterPlot } from "../ScatterPlot"


const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

class PlayersGraphs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isProcessing: false,
      dataProcessed: [],
      dData: [],
      lwData: [],
      rwData: [],
      cData: [],
      xAxis: "",
      yAxis: "",
      colourMetric: "",
      nameMetric: "",
      minMetric: "",
      minMetricValue: 0,
      parseBy: "",
    };
    this.getMetricList = this.getMetricList.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const np = nextProps;
    const s = this.state;
    if (!np.isLoading && (np.dataSource !== s.dataSource || np.xAxis !== s.xAxis || np.yAxis !== s.yAxis || np.colourMetric !== s.colourMetric || np.minMetric !== s.minMetric || np.minMetricValue !== s.minMetricValue)) {
      this.getMetricList(np.xAxis, np.yAxis, np.colourMetric, np.nameMetric, np.dataSource, np.minMetric, np.minMetricValue);
      this.setState({
        dataSource: np.dataSource,
        xAxis: np.xAxis,
        yAxis: np.yAxis,
        colourMetric: np.colourMetric,
        nameMetric: np.nameMetric,
        minMetric: np.minMetric,
        minMetricValue: np.minMetricValue,
      });
    }
  }

  getMetricList(xAxis, yAxis, colourMetric, nameMetric, objToParse, minMetric, minMetricValue) {
    this.setState({ isProcessing: true });
    const parseByForward = this.props.parseByForward;
    let l = [];
    let d = [];
    let lw = [];
    let rw = [];
    let c = [];
    objToParse.forEach(
      function(data) {
        if(data[minMetric] >= minMetricValue) {
          if(parseByForward){
            if(data["pos_code"] === "C") {
              c.push([ data[xAxis], data[yAxis], data[colourMetric], data[nameMetric] ])
            } else if(data["pos_code"] === "D") {
              d.push([ data[xAxis], data[yAxis], data[colourMetric], data[nameMetric] ])
            } else if(data["pos_code"] === "L") {
              lw.push([ data[xAxis], data[yAxis], data[colourMetric], data[nameMetric] ])
            } else if(data["pos_code"] === "R") {
              rw.push([ data[xAxis], data[yAxis], data[colourMetric], data[nameMetric] ])
            }
          } else {
            l.push([ data[xAxis], data[yAxis], data[colourMetric], data[nameMetric] ])
          }
        }
      }
    );
    console.log("done loop", l);
    if(parseByForward) {
      this.setState({
        dData: d,
        lwData: lw,
        rwData: rw,
        cData: c,
      });
    } else {
      this.setState({
        dataProcessed: l,
      });
    }
    this.setState({ isProcessing: false });
  }


  render() {
    let content = (
      <LoadingWrapper>
        <Spin tip="Loading...">
        </Spin>
      </LoadingWrapper>
    );
    if (!this.props.loading && !this.state.isProcessing) {
      content = (
        <div style={{width: "100%", height: "100%", minHeight: this.props.height ? this.props.height : 500, position: "relative"}}>
          <ScatterPlot
            m={this.props.isMobile}
            data={this.state.dataProcessed}
            lwData={this.state.lwData}
            rwData={this.state.rwData}
            cData={this.state.cData}
            dData={this.state.dData}
            {...this.props} />
        </div>
      );
    }

    return (
      <React.Fragment>
        {content}
      </React.Fragment>
    )}
}


export default withRouter(withTheme(PlayersGraphs));
