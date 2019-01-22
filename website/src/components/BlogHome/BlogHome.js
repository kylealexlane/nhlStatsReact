import React, { Component } from 'react';
import {Link, withRouter} from "react-router-dom";
import Butter from 'buttercms'
import styled, { withTheme } from "styled-components";
import {connect} from "react-redux";
import { Popover, Card, Icon, Avatar, Spin, Alert } from 'antd';
import {layout} from "../../styles/theme";
import maintheme from "../../styles/theme";
import { TableAbove } from "../TableAbove";


const { Meta } = Card;

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

const BottomText = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1;
`;

const BlogItem = styled.div`
  padding: 16px;
`;

const BlogItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;


class BlogHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  fetchPosts(page) {
    butter.post.list({page: page, page_size: 100}).then((resp) => {
      this.setState({
        loaded: true,
        resp: resp.data
      })
    });
  }

  componentWillMount() {
    // let page = this.props.params.page || 1;
    let page = this.props.match.params.page || 1;
    this.fetchPosts(page)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({loaded: false});
    // let page = nextProps.params.page || 1;
    let page = nextProps.match.params.page || 1;
    this.fetchPosts(page)
  }

  render() {
    let content = (
      <LoadingWrapper>
        <Spin tip="Loading...">
        </Spin>
      </LoadingWrapper>
    );
    if (this.state.loaded) {
      const post = this.state.post;
      content = (
        <BlogItemWrapper>
          {this.state.resp.data.map((post) => {
            return (
              <BlogItem key={post.slug}>
                <Card
                  style={{ width: "100%", maxWidth: maintheme.layout.maxBlogPostWidthInt }}

                  cover={<img alt="example" src={post.featured_image} />}
                  actions={[
                    <Link to={`/post/${post.slug}`}><Icon type="file-text" /></Link>,
                    <BottomText>{post.author.first_name.charAt(0).toUpperCase()}. {post.author.last_name}</BottomText>,
                    <BottomText>{new Date(post.published).toLocaleDateString()}</BottomText>]}
                >
                  <Link to={`/post/${post.slug}`}>
                    <Meta
                      avatar={<Avatar src={post.featured_image} />}
                      title={post.title}
                      description={post.summary}
                    />
                  </Link>
                </Card>
              </BlogItem>
            )
          })}
        </BlogItemWrapper>
      );
    }

    return(
      <React.Fragment>
        <MainWrapper
          // style={{ width: this.state.width - this.state.sidebarWidth - (layout.outerPaddingInt*2)}}
        >
          <TableAbove
            title={"About"}
            subTitle={"Information, research, and news is posted here and displayed in chronological order"}
          />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (withTheme(BlogHome)));
