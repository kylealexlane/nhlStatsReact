import React from "react";
import styled, { withTheme } from "styled-components";
import "react-typist/dist/Typist.css";
// import styled from "styled-components/typings/styled-components";
import {Select, InputNumber} from "antd/lib/index";
import theme from "../../styles/theme"

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
  padding-right: 24px;
  flex: 0;
`;

const TitleDiv = styled.div`
  flex-basis: 100%;
  padding-bottom: 8px;
`;

const Title = styled.h1`
  // display: inline;
  padding-right: 24px;
`;

const Subtitle = styled.p`
  // display: inline;
  padding-right: 24px;
`;


class TableAbove extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOpts: this.props.defaultSelectFilters ? this.props.defaultSelectFilters : ['year', 'gametype']
      // selectPageNum: (this.props.defaultSelectFilters.indexOf("pagenum") > -1) ? true : false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ selectedOpts: value })
  }

  render() {
    const Option = Select.Option;

    let selectYear;
    let selectGameType;
    let chooseSelect;
    let selectNumPerPage;

    // Selector for choosing which filters to show/display
    if(this.props.chooseSelects) {
      const children = [];
      this.props.selectsOptions.forEach(function (opt) {
        children.push(<Option key={opt.val}>{opt.label}</Option>);
      });
      chooseSelect =
        <SelectDiv>
          <Select
            mode="multiple"
            style={{ minWidth: 220, maxWidth: 400 }}
            placeholder="Choose Filters"
            defaultValue={this.props.defaultSelectFilters ? this.props.defaultSelectFilters : ['year', 'gametype']}
            onChange={this.handleChange}
          >
            {children}
          </Select>
        </SelectDiv>
    }

    // year filter
    if(this.state.selectedOpts.indexOf("year") > -1){
      selectYear =
        <SelectDiv>
          <Select
            defaultValue="20182019"
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

    // gametype filter
    if(this.state.selectedOpts.indexOf("gametype") > -1){
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

    // page number filter for pagination
    if(this.state.selectedOpts.indexOf("pagenum") > -1){
      selectNumPerPage =
        <InputNumber min={1} max={1000} defaultValue={this.props.deafultPageNum? this.props.deafultPageNum: theme.DefaultNumTableItems} onChange={this.props.pageNumChangeCallback} />
    }

      return(
    <Header>
      <TitleDiv>
        <Title>{this.props.title}</Title>
        <Subtitle>{this.props.subTitle}</Subtitle>
      </TitleDiv>
      {chooseSelect}
      {selectYear}
      {selectGameType}
      {selectNumPerPage}
    </Header>)}
};

export default withTheme(TableAbove);
// export default TableAbove;
