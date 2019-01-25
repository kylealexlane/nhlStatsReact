import React from "react";

import { Goalies } from "../../components/Goalies";

const GoaliesContainer = (props) => (
  <React.Fragment>
    <Goalies {...props} />
  </React.Fragment>
);

export default GoaliesContainer;
