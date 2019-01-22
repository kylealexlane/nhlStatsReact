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
      parseBy: "",
    };
    this.getMetricList = this.getMetricList.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const np = nextProps;
    if (np.dataSource !== this.state.dataSource && !np.isLoading &&
      np.metric1 && np.metric2 && np.colourMetric) {
      this.setState({ dataSource: np.dataSource });
      this.getMetricList(np.metric1, np.metric2, np.colourMetric, np.nameMetric, np.dataSource, np.minMetric, np.minMetricValue);
    }
  }

  getMetricList(metric1, metric2, colourMetric, nameMetric, objToParse, minMetric, minMetricValue) {
    console.log("transforming...");
    console.log(objToParse);
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
              c.push([ data[metric1], data[metric2], data[colourMetric], data[nameMetric] ])
            } else if(data["pos_code"] === "D") {
              d.push([ data[metric1], data[metric2], data[colourMetric], data[nameMetric] ])
            } else if(data["pos_code"] === "L") {
              lw.push([ data[metric1], data[metric2], data[colourMetric], data[nameMetric] ])
            } else if(data["pos_code"] === "R") {
              rw.push([ data[metric1], data[metric2], data[colourMetric], data[nameMetric] ])
            }
          } else {
            l.push([ data[metric1], data[metric2], data[colourMetric], data[nameMetric] ])
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
