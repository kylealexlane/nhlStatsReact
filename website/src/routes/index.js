import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import styled, { withTheme } from "styled-components";
import { history } from "../store";
import { MenuBar } from "../components/MenuBar"

import {
  AboutContainer,
  BaseContainer,
  PlayersContainer,
  TeamsContainer,
  GoaliesContainer,
  ModelContainer,
} from "../containers";

const Container = styled.div`
  text-align: left;
`;

function Routes() {
  return (
    <ConnectedRouter history={history}>
      <React.Fragment>
        <MenuBar/>
        <Container>
          {/*<Route exact path={process.env.PUBLIC_URL + "/"} component={HomeContainer} />*/}
          {/*<Route exact path={"/"} component={HomeContainer} />*/}
          <Route exact path={process.env.PUBLIC_URL + "/"} component={BaseContainer} />
          {/*<Route exact path={"/"} component={BaseContainer} />*/}
          <Route exact path={"/players"} component={PlayersContainer} />
          <Route exact path={"/goalies"} component={GoaliesContainer} />
          <Route exact path={"/teams"} component={TeamsContainer} />
          <Route exact path={"/model"} component={ModelContainer} />
          <Route exact path={"/about"} component={AboutContainer} />
        </Container>
      </React.Fragment>
    </ConnectedRouter>
  );
}

export default withTheme(Routes);
