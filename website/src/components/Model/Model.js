import React from "react";
import { withTheme } from "styled-components";
import "react-typist/dist/Typist.css";
import Butter from 'buttercms';


class Model extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    document.title = "Model";
    const butter = Butter('3e57058a25a5cd171ba409a081c9da7e0cbe6f54');
    butter.post.list({page: 1, page_size: 10}).then(function(response) {
      console.log(response)
    })
  }

  render() {
    return (
      <React.Fragment>
        <p>Model</p>
      </React.Fragment>
    );
  }
}

export default withTheme(Model);
