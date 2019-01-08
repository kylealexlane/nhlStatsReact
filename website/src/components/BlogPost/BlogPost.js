import React, { Component } from 'react';
import Butter from 'buttercms'
import { Helmet } from "react-helmet";
import {withRouter} from "react-router-dom";
import styled, { withTheme } from "styled-components";
import {connect} from "react-redux";
import {layout} from "../../styles/theme";

const butter = Butter('3e57058a25a5cd171ba409a081c9da7e0cbe6f54');

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


class BlogPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      post: ""
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentWillMount() {
    let slug = this.props.match.params.slug;

    butter.post.retrieve(slug).then((resp) => {
      this.setState({
        loaded: true,
        post: resp.data.data
      })
    });
  }

  // Functions for calculating window size on the fly and dynamically updating things
  componentDidMount() {
    document.title = this.state.post;
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    let content = (
      <div>
        Loading...
      </div>
    );
    if (this.state.loaded) {
      const post = this.state.post;
      content = (
        <div className={"post-container"}>
          <Helmet>
            <title>{post.seo_title}</title>
            <meta name="description" content={post.meta_description} />
            <meta name="og:image" content={post.featured_image} />
          </Helmet>

          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{__html: post.body}} />
        </div>
      );
    }

    return(
      <React.Fragment>
        <MainWrapper style={{ width: this.state.width - this.state.sidebarWidth - (layout.outerPaddingInt*2)}}>
          {content}
        </MainWrapper>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const mapStateToProps = (state) => {
  return {
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (withTheme(BlogPost)));
