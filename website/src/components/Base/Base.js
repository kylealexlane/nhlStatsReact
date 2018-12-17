import React from "react";
import styled, { withTheme } from "styled-components";
import "react-typist/dist/Typist.css";
import mainTheme from "../../styles/theme";

const Header = styled.header`
  margin-bottom: 24px;
  width: 100%;
`;

const MainWrapper = styled.div`
  margin: 0;
  width: 100%;
`;

const ParagraphDiv = styled.div`
  margin-top: 24px;
  font-size: 16px;
`;

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    document.title = "Puckluck";
  }

  render() {
    return <React.Fragment>
      <MainWrapper>
        <Header>
          <h1>Under Construction!</h1>
          <ParagraphDiv>Front-end is currently under construction :(</ParagraphDiv>
          <ParagraphDiv>Check back soon for restored functionality and improvements!</ParagraphDiv>
          <ParagraphDiv>In the mean time, check out the api documentation at <a href="http://docs.thepuckluck.com"><b>docs.thepuckluck.com</b></a></ParagraphDiv>
          <ParagraphDiv>Api requests are still functional through <a href="http://docs.thepuckluck.com"><b>api.thepuckluck.com/...</b></a> see documentation for details</ParagraphDiv>
        </Header>
      </MainWrapper>
    </React.Fragment>;
  }
}

export default withTheme(Base);
