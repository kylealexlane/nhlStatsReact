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
    if(nextProps.defaultSelectFilters !== this.state.selectedOpts && nextProps.defaultSelectFilters){
      this.setState({ selectedOpts: nextProps.defaultSelectFilters });
    }
  }

  render() {
    const Option = Select.Option;

    let selectYear;
    let selectGameType;
    let chooseSelect;
    let selectNumPerPage;
    let selectSituationType;
    let selectStatsType;
    let minShotNum;
    let xAxis;
    let yAxis;
    let xAxisG;
    let yAxisG;


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
            style={{ minWidth: 260 }}
            placeholder="Choose Filters"
            defaultValue={this.props.defaultSelectFilters ? this.props.defaultSelectFilters : ['year', 'gametype']}
            onChange={this.handleChange}
            value={this.state.selectedOpts}
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
            defaultValue="20192020"
            style={{width: 160}}
            onChange={(value) => this.props.selectYearCallback(value)}
          >
            <Option value="20192020">2019-2020</Option>
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

    // Stats type filter
    if(this.state.selectedOpts.indexOf("statstype") > -1){
      selectStatsType =
        <SelectDiv>
          <FilterTitle>Stats Type</FilterTitle>
          <Select
            defaultValue={this.props.defaultStatstype ? this.props.defaultStatstype : "basic"}
            style={{width: 160}}
            onChange={(value) => this.props.changeSelectStatsTypeCallback(value)}
          >
            <Option value="basic">Basic</Option>
            <Option value="freq">Frequencies</Option>
            {this.props.goalieStats ? <Option value="savepercs">Save %s</Option> :
              <Option value="shootpercs">Shooting %s</Option>}
            <Option value="actualvals">Actual Values</Option>
            <Option value="expectedvals">Expected Values</Option>
            <Option value="all">All</Option>
          </Select>
        </SelectDiv>
    }

    // page number filter for pagination
    if(this.state.selectedOpts.indexOf("pagenum") > -1){
      selectNumPerPage =
        <SelectDiv>
          <FilterTitle>Items Per Page</FilterTitle>
          <InputNumber
            min={1} max={1000}
            style={{width: 135}}
            defaultValue={this.props.deafultPageNum? this.props.deafultPageNum: theme.DefaultNumTableItems}
            onChange={this.props.pageNumChangeCallback} />
        </SelectDiv>
    }

    // Min Shots filter
    if(this.state.selectedOpts.indexOf("minshots") > -1){
      minShotNum =
        <SelectDiv>
          <FilterTitle>Min Shots</FilterTitle>
          <InputNumber
            min={1} max={5000}
            style={{width: 135}}
            defaultValue={this.props.defaultMinShots? this.props.defaultMinShots: theme.defaultMinShotsGraph}
            onChange={this.props.minShotsChangeCallback} />
        </SelectDiv>
    }

    // Select Y Axis filter
    if(this.state.selectedOpts.indexOf("yaxisplayers") > -1){ // Players
      yAxis =
        <SelectDiv>
          <FilterTitle>Y Axis Metric</FilterTitle>
          <Select
            defaultValue="avg_shoot_perc"
            style={{width: 160}}
            onChange={(value) => this.props.changeYAxisCallback(value)}
          >
            <Option value="avg_shoot_perc">Shooting %</Option>
            <Option value="avg_xgoals">xShooting %</Option>
            <Option value="goals_aa_per_shot">GoalsAA/s</Option>
            <Option value="num_goals">Goals</Option>
            <Option value="sum_xgoals">xGoals</Option>
            <Option value="shot_quality">Shot Quality</Option>
            <Option value="mean_dist">Avg Dist</Option>
            <Option value="mean_ang">Avg Ang</Option>
            <Option value="num_shots">Shots</Option>
          </Select>
        </SelectDiv>
    }
    if(this.state.selectedOpts.indexOf("yaxisgoalies") > -1){ // Goalies
      yAxisG =
        <SelectDiv>
          <FilterTitle>Y Axis Metric</FilterTitle>
          <Select
            defaultValue="save_perc"
            style={{width: 160}}
            onChange={(value) => this.props.changeYAxisCallback(value)}
          >
            <Option value="save_perc">Save %</Option>
            <Option value="xsave_perc">xSave %</Option>
            <Option value="saves_aa_per_shot">SavesAA/s</Option>
            <Option value="num_goals">Goals</Option>
            <Option value="sum_xgoals">xGoals</Option>
            <Option value="shot_quality">Shot Quality</Option>
            <Option value="mean_dist">Avg Dist</Option>
            <Option value="mean_ang">Avg Ang</Option>
            <Option value="num_shots">Shots</Option>
          </Select>
        </SelectDiv>
    }

    // Select X Axis filter
    if(this.state.selectedOpts.indexOf("xaxisplayers") > -1){ // Players
      xAxis =
        <SelectDiv>
          <FilterTitle>X Axis Metric</FilterTitle>
          <Select
            defaultValue="avg_xgoals"
            style={{width: 160}}
            onChange={(value) => this.props.changeXAxisCallback(value)}
          >
            <Option value="avg_shoot_perc">Shooting %</Option>
            <Option value="avg_xgoals">xShooting %</Option>
            <Option value="goals_aa_per_shot">GoalsAA/s</Option>
            <Option value="num_goals">Goals</Option>
            <Option value="sum_xgoals">xGoals</Option>
            <Option value="shot_quality">Shot Quality</Option>
            <Option value="mean_dist">Avg Dist</Option>
            <Option value="mean_ang">Avg Ang</Option>
            <Option value="num_shots">Shots</Option>
          </Select>
        </SelectDiv>
    }
    if(this.state.selectedOpts.indexOf("xaxisgoalies") > -1){ // Goalies
      xAxisG =
        <SelectDiv>
          <FilterTitle>X Axis Metric</FilterTitle>
          <Select
            defaultValue="xsave_perc"
            style={{width: 160}}
            onChange={(value) => this.props.changeXAxisCallback(value)}
          >
            <Option value="save_perc">Save %</Option>
            <Option value="xsave_perc">xSave %</Option>
            <Option value="saves_aa_per_shot">SavesAA/s</Option>
            <Option value="num_goals">Goals</Option>
            <Option value="sum_xgoals">xGoals</Option>
            <Option value="shot_quality">Shot Quality</Option>
            <Option value="mean_dist">Avg Dist</Option>
            <Option value="mean_ang">Avg Ang</Option>
            <Option value="num_shots">Shots</Option>
          </Select>
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
      {selectStatsType}
      {selectNumPerPage}
      {minShotNum}
      {yAxis}
      {xAxis}
      {yAxisG}
      {xAxisG}
    </Header>)}
}

export default withTheme(TableAbove);