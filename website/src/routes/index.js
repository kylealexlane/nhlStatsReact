import React from "react";
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import styled, { withTheme } from "styled-components";
import { history } from "../store";
import { SideBar } from "../components/SideBar";
import { connect } from 'react-redux';

import {
  BaseContainer,
  PlayersContainer,
  TeamsContainer,
  GoaliesContainer,
  ModelContainer
} from "../containers";

const Container = styled.div`
  ${props => props.theme.flex.flexStart};
  text-align: left;
`;

const Content = styled.div`
  ${props => props.theme.flex.flexColumnTopCenter};
  color: ${props => props.theme.colors.mainText};
  background: ${props => props.theme.colors.secondaryBackground};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  padding: ${props => props.theme.layout.outerPadding};
  height: 100%;
  min-height: calc(100vh - ${props => props.theme.layout.topBarHeight});
  width: 100%;
`;

function Routes() {
  return (
    <Router>
      <Container>
        <SideBar
          render={
            <Content>
              {/*<Route exact path={process.env.PUBLIC_URL + "/"} component={HomeContainer} />*/}
              {/*<Route exact path={"/"} component={HomeContainer} />*/}
              <Route
                exact
                path={process.env.PUBLIC_URL + "/"}
                component={BaseContainer}
              />
              {/*<Route exact path={"/"} component={BaseContainer} />*/}
              <Route path={"/players"} component={PlayersContainer} />
              <Route path={"/goalies"} component={GoaliesContainer} />
              <Route path={"/teams"} component={TeamsContainer} />
              <Route path={"/model"} component={ModelContainer} />
            </Content>
          }
        />
        {/* <TopBar /> */}
      </Container>
    </Router>
  );
}

// export default withRouter(connect(mapStateToProps)(Something))

// export default withRouter(connect(mapStateToProps)) (withTheme(Routes));

export default withTheme(Routes);
