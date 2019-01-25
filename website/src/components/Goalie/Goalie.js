import React from "react";
import styled, { withTheme } from "styled-components";
import "react-typist/dist/Typist.css";
import maintheme from "../../styles/theme"
import { layout } from "../../styles/theme"
import { goalieFetchData, goalieFetchBio } from '../../actions/goalie';
import { connect } from 'react-redux';
import { IndividualAbove } from "../IndividualAbove";
import {withRouter} from "react-router-dom";
import dataColumns from "../../utils/dataColumns"
import { GoalieGraphs } from "../GoalieGraphs";
import { Tabs } from 'antd';
import { GoalieTables } from "../GoalieTables"


const TabPane = Tabs.TabPane;

const MainWrapper = styled.div`
  align-self: center;
  margin: 0;
  width: 100%;
  height: 100%;
  max-width: ${props => props.theme.layout.maxWrapperWidthInt}px;
  padding-top: ${props => props.theme.layout.paddingVertical};
  padding-bottom: ${props => props.theme.layout.paddingVertical};
  padding-right: ${props => props.theme.layout.paddingHorizontal};
  padding-left: ${props => props.theme.layout.paddingHorizontal};
  background: ${props => props.theme.colors.mainBackground};
  min-height: calc(100vh - ${props => props.theme.layout.topBarHeight} - ${props => props.theme.layout.paddingVertical} * 2);
`;

const Section = styled.div`
  margin-top: 16px;
  margin-left: 16px;
  border-left: 5px solid ${props => props.theme.colors.mainAccent};
  padding-left: 16px;
`;

const SectionTitle = styled.h2`
  margin-left: 16px;
  margin-top: 16px;
  text-transform: none;
  color: ${props => props.theme.colors.mainAccent};
`;


class Goalie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      isLoading: true,
      data: [],
      bio: [],
      sidebarWidth: this.props.sidebarCollapsed ? layout.sidebarCollapsedWidth : layout.sideBarWidth,
      depth: this.props.depth ? this.props.depth : "basicranks",
      pageNum: maintheme.DefaultNumTableItems,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.fetchGoalieData =  this.fetchGoalieData.bind(this);
    this.tabchange = this.tabchange.bind(this);
  }

  // Functions for calculating window size on the fly and dynamically updating things
  componentDidMount() {
    document.title = "Goalie";
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.fetchGoalieData(this.props.match.params.slug);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.goalie !== this.state.goalie) {
      this.setState({ data: nextProps.goalie });
    }
    if (nextProps.goalieBio !== this.state.goalieBio) {
      this.setState({ bio: nextProps.goalieBio });
    }
    if (nextProps.isLoading !== this.state.isLoading) {
      this.setState({ isLoading: nextProps.isLoading });
    }
    if (nextProps.sidebarCollapsed !== this.state.sidebarCollapsed) {
      this.setState({
        sidebarCollapsed: nextProps.sidebarCollapsed,
        sidebarWidth: nextProps.sidebarCollapsed ? layout.sidebarCollapsedWidth : layout.sideBarWidth
      });
    }
  }

  fetchGoalieData(slug) {
    this.props.fetchData(`https://www.api.thepuckluck.com/api/v1/goalies/${slug}?returntype=list&depth=allsummaries`);
    this.props.fetchBio(`https://statsapi.web.nhl.com/api/v1/people/${slug}`);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  tabchange(key){
    console.log(key)
  }



  render() {
    // Width calculations for proper re-sizing
    let pw = this.props.sidebarGone ?
      this.state.width - (layout.outerPaddingInt*2) :
      this.state.width - this.state.sidebarWidth - (layout.outerPaddingInt*2);
    let w = (pw < maintheme.layout.maxWrapperWidthInt) ? pw : maintheme.layout.maxWrapperWidthInt;

    return (
      <React.Fragment>
        <MainWrapper style={{ width: w}}>
          <IndividualAbove
            isLoading={this.state.isLoading}
            type={"goalie"}
          />
          <Tabs defaultActiveKey="1" onChange={this.tabchange}>
            <TabPane tab="Puck Luck" key="1">
              <SectionTitle >Puck Luck</SectionTitle>
              <Section>
                <GoalieGraphs />
              </Section>
            </TabPane>
            <TabPane tab="Stats" key="2">
              <SectionTitle >Stats</SectionTitle>
              <Section>
                <GoalieTables />
              </Section>
            </TabPane>
            {/*<TabPane tab="Ranking" key="3" disabled>Coming soon!</TabPane>*/}
            {/*<TabPane tab="Bio" key="4" disabled>Coming soon!</TabPane>*/}

          </Tabs>


        </MainWrapper>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(goalieFetchData(url)),
    fetchBio: (url) => dispatch(goalieFetchBio(url)),
  };
};

const mapStateToProps = (state) => {
  return {
    goalie: state.goalie,
    goalieBio: state.goalieBio,
    hasErrored: (state.goalieHasErrored || state.goalieBioHasErrored),
    isLoading: (state.goalieIsLoading || state.goalieBioIsLoading),
    sidebarCollapsed: state.sidebarCollapsed,
    sidebarGone: state.sidebarGone,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (withTheme(Goalie)));
