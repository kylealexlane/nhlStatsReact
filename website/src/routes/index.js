import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import styled, { withTheme } from "styled-components";
import { history } from "../store";
import { SideBar } from "../components/SideBar";
import { TopBar } from "../components/TopBar";
import { Layout } from "antd";

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

function Routes() {
  return (
    <ConnectedRouter history={history}>
      <Container>
        <SideBar
          render={
            <React.Fragment>
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
            </React.Fragment>
          }
        />
        {/* <TopBar /> */}
      </Container>
    </ConnectedRouter>
  );
}

export default withTheme(Routes);
