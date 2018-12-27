import React from "react";
import styled, { withTheme } from "styled-components";
import "react-typist/dist/Typist.css";
// import styled from "styled-components/typings/styled-components";
import {Select} from "antd/lib/index";

const Header = styled.header`
  margin-bottom: 24px;
  ${props => props.theme.flex.flexRowJustifyStart};
  width: 100%;
  flex-wrap: wrap;
`;

const SelectDiv = styled.div`
  color: ${props => props.theme.colors.mainText};
  font-size: ${props => props.theme.fontSize.subHeading};
  margin: 0;
  padding-left: 24px;
  flex: 0;
`;


class TableAbove extends React.Component {

  render() {
    const Option = Select.Option;

    let selectYear;
    let selectGameType;

    if(this.props.selectYear){
      selectYear =
        <SelectDiv>
          <Select
            defaultValue="2018"
            style={{width: 160}}
            onChange={(value) => this.props.selectYearCallback(value)}
          >
            <Option value="20182019">2018-2019</Option>
            <Option value="20172018">2017-2018</Option>
            <Option value="20162017">2016-2017</Option>
            <Option value="20152016">2015-2016</Option>
            <Option value="20142015">2014-2015</Option>
            <Option value="20132014">2013-2014</Option>
            <Option value="20122013">2012-2013</Option>
            <Option value="20112012">2011-2012</Option>
          </Select>
        </SelectDiv>
    }

    if(this.props.selectGameType){
      selectGameType =
        <SelectDiv>
          <Select
            defaultValue="R"
            style={{width: 160}}
            onChange={(value) => this.props.selectGameTypeCallback(value)}
          >
            <Option value="R">Regular Season</Option>
            <Option value="P">Playoffs</Option>
          </Select>
        </SelectDiv>
    }

    return(
    <Header>
      <h1>{this.props.title}</h1>
      {selectYear}
      {selectGameType}
    </Header>)}
};

export default withTheme(TableAbove);
// export default TableAbove;
