import React from "react";
import { withTheme } from "styled-components";
import "react-typist/dist/Typist.css";

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    document.title = "Puckluck";
  }

  render() {
    return <React.Fragment>thepuckluck.com</React.Fragment>;
  }
}

export default withTheme(Base);
