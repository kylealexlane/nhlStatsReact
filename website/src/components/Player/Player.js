import React from "react";
import styled, { withTheme } from "styled-components";
import "react-typist/dist/Typist.css";
import { Table } from "../Table";
import maintheme from "../../styles/theme"
import { layout } from "../../styles/theme"
import { playerFetchData, playerFetchBio } from '../../actions/player';
import { connect } from 'react-redux';
import { IndividualAbove } from "../IndividualAbove";
import {withRouter} from "react-router-dom";
import dataColumns from "../../utils/dataColumns"
import { PlayerGraphs } from "../PlayerGraphs";
import { Tabs } from 'antd';
import { PlayerTables } from "../PlayerTables"

const maxTableWidth = 1200;

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


class Player extends React.Component {
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
    this.fetchPlayerData =  this.fetchPlayerData.bind(this);
    this.tabchange = this.tabchange.bind(this);
  }

  // Functions for calculating window size on the fly and dynamically updating things
  componentDidMount() {
    document.title = "Player";
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.fetchPlayerData(this.props.match.params.slug);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  componentWillReceiveProps(nextProps) {
    console.log("player next props", nextProps);
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.player !== this.state.player) {
      this.setState({ data: nextProps.player });
    }
    if (nextProps.playerBio !== this.state.playerBio) {
      this.setState({ bio: nextProps.playerBio });
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

  fetchPlayerData(slug) {
    this.props.fetchData(`https://www.api.thepuckluck.com/api/v1/players/${slug}?returntype=list&depth=allsummaries`);
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

    // const cols = dataColumns.playersBasicColumns;
    const cols = dataColumns.test;


    return (
      <React.Fragment>
        <MainWrapper style={{ width: w}}>
          <IndividualAbove
            isLoading={this.state.isLoading}
            type={"player"}
          />
          <Tabs defaultActiveKey="1" onChange={this.tabchange}>
            <TabPane tab="Puck Luck" key="1">
              <SectionTitle >Puck Luck</SectionTitle>
              <Section>
                <PlayerGraphs />
              </Section>
            </TabPane>
            <TabPane tab="Stats" key="2">
              <SectionTitle >Stats</SectionTitle>
              <Section>
                <PlayerTables />
              </Section>
            </TabPane>
            {/*<TabPane tab="Ranking" key="3" disabled>Content of Tab Pane 3</TabPane>*/}
            {/*<TabPane tab="Bio" key="4" disabled>Content of Tab Pane 4</TabPane>*/}

          </Tabs>


        </MainWrapper>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(playerFetchData(url)),
    fetchBio: (url) => dispatch(playerFetchBio(url)),
  };
};

const mapStateToProps = (state) => {
  return {
    player: state.player,
    playerBio: state.playerBio,
    hasErrored: (state.playerHasErrored || state.playerBioHasErrored),
    isLoading: (state.playerIsLoading || state.playerBioIsLoading),
    sidebarCollapsed: state.sidebarCollapsed,
    sidebarGone: state.sidebarGone,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (withTheme(Player)));
