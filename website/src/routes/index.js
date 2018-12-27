import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import styled, { withTheme } from "styled-components";
import { history } from "../store";
import { SideBar } from "../components/SideBar";

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
  background: ${props => props.theme.colors.mainBackground};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  // padding: 16px;
  height: 100%;
  min-height: calc(100vh - ${props => props.theme.layout.topBarHeight});
  width: 100%;
`;

function Routes() {
  return (
    <ConnectedRouter history={history}>
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
              <Route exact path={"/players"} component={PlayersContainer} />
              <Route exact path={"/goalies"} component={GoaliesContainer} />
              <Route exact path={"/teams"} component={TeamsContainer} />
              <Route exact path={"/model"} component={ModelContainer} />
            </Content>
          }
        />
        {/* <TopBar /> */}
      </Container>
    </ConnectedRouter>
  );
}

export default withTheme(Routes);
