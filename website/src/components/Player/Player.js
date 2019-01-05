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


const maxTableWidth = 1200;

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
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.fetchPlayerData =  this.fetchPlayerData.bind(this);
  }

  // Functions for calculating window size on the fly and dynamically updating things
  componentDidMount() {
    document.title = "Player";
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    console.log("player props", this.props);
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
    this.props.fetchData(`http://www.api.thepuckluck.com/api/v1/players/${slug}?returntype=list&depth=allsummaries&gametype=R`);
    this.props.fetchBio(`https://statsapi.web.nhl.com/api/v1/people/${slug}`);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
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
          />
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
    isLoading: (state.playerIsLoading|| state.playerBioIsLoading),
    sidebarCollapsed: state.sidebarCollapsed,
    sidebarGone: state.sidebarGone,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (withTheme(Player)));
