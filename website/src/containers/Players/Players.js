import React from "react";

import { Players } from "../../components/Players";

const PlayersContainer = (props) => (
  <React.Fragment>
    <Players {...props} />
  </React.Fragment>
);

export default PlayersContainer;
