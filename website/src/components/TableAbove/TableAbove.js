import React from "react";
import styled, { withTheme } from "styled-components";
import "react-typist/dist/Typist.css";
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
  margin-top: 8px;
  line-height: 80%;
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

const FilterTitle = styled.p`
  margin: 0;
  font-size: ${props => props.theme.fontSize.filterTitle};
`;

class TableAbove extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOpts: this.props.defaultSelectFilters ? this.props.defaultSelectFilters : [],
      situationValue: this.props.defaultSituation ? this.props.defaultSituation : "offensive"
    };
    this.handleChange = this.handleChange.bind(this);
    this.changeSelectSituation = this.changeSelectSituation.bind(this);
  }

  handleChange(value) {
    this.setState({ selectedOpts: value })
  }

  changeSelectSituation(value) {
    this.setState({situationValue: value});
    this.props.selectSituationCallback(value);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location && nextProps.location.state && (nextProps.location.state.situation !== this.state.situationValue)) {
      this.changeSelectSituation(nextProps.location.state.situation);
    }
  }

  render() {
    const Option = Select.Option;

    let selectYear;
    let selectGameType;
    let chooseSelect;
    let selectNumPerPage;
    let selectSituationType;

    // Selector for choosing which filters to show/display
    if(this.props.chooseSelects) {
      const children = [];
      this.props.selectsOptions.forEach(function (opt) {
        children.push(<Option key={opt.val}>{opt.label}</Option>);
      });
      chooseSelect =
        <SelectDiv>
          <FilterTitle>Add/Remove Options</FilterTitle>
          <Select
            mode="multiple"
            style={{ minWidth: 220 }}
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
          <FilterTitle>Year</FilterTitle>
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
          <FilterTitle>Game Type</FilterTitle>
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

    // situation filter
    if(this.state.selectedOpts.indexOf("situation") > -1){
      selectSituationType =
        <SelectDiv>
          <FilterTitle>Situation</FilterTitle>
          <Select
            // defaultValue={this.props.defaultSituation ? this.props.defaultSituation : "offensive"}
            style={{width: 200}}
            onChange={(value) => this.changeSelectSituation(value)}
            value={this.state.situationValue}
          >
            <Option value="offensive">Offensive (shots for)</Option>
            <Option value="defensive">Defensive (shots against)</Option>
          </Select>
        </SelectDiv>
    }

    // page number filter for pagination
    if(this.state.selectedOpts.indexOf("pagenum") > -1){
      selectNumPerPage =
        <SelectDiv>
          <FilterTitle>Items Per Page</FilterTitle>
          <InputNumber min={1} max={1000} style={{width: 135}} defaultValue={this.props.deafultPageNum? this.props.deafultPageNum: theme.DefaultNumTableItems} onChange={this.props.pageNumChangeCallback} />
        </SelectDiv>
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
      {selectSituationType}
      {selectNumPerPage}
    </Header>)}
};

export default withTheme(TableAbove);