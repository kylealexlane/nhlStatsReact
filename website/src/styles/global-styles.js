import { injectGlobal } from "styled-components";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less';
// import url('https://fonts.googleapis.com/css?family=Raleway');

injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background: #fff;
  }

  h1 {
    color: #f76600;
    font-weight: 400;
    font-size: 44px;
    margin: 0;
    font-family: 'Open Sans', sans-serif;
    // font-family: 'Staatliches', cursive;
    // text-transform: uppercase;
  }
  h2 {
    font-size: 36px;
    font-weight: 400;
    text-transform: uppercase;
    // letter-spacing: 3px;
    font-family: 'Open Sans', sans-serif;
  }
  h3 {
    font-size: 24px;
    font-weight: 300;
    text-transform: uppercase;
    // letter-spacing: 2px;
    font-family: 'Open Sans', sans-serif;
  }
  h4 {
    font-size: 20px;
    font-weight: 300;
    // letter-spacing: 1px;
    font-family: 'Open Sans', sans-serif;
  }
  p {
    font-size: 18px;
    font-weight: 300;
    line-height: 30px;
    // font-family: 'Roboto', sans-serif;
    font-family: "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  a {
    // color: green;
    // :hover, :focus, :active {
    //   color: red;
    // }
  }
  @media only screen and (max-width: 600px) {
    h1 {
    font-size: 40px;
    font-weight: 500;
    line-height: 64px;
    }
    h2 {
      font-size: 44px;
      font-weight: 400;
      text-transform: uppercase;
      letter-spacing: 3px;
    }
    h3 {
      font-size: 24px;
      font-weight: 300;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    h4 {
      font-size: 20px;
      font-weight: 300;
      letter-spacing: 1px;
    }
    p {
      font-size: 18px;
      font-weight: 300;
      line-height: 30px;
    }
  }
  

  ul {
    list-style: none;
    padding-left: 0;
  }
  
  .post-container {
    h1, h2, h3, h4, h5 {
        // font-weight: 600;
        // margin-bottom: 1em;
        // margin-top: 1.5em;
    }

    ul, ol {
        margin-bottom: 1.25em;

        li {
            margin-bottom: 0.25em;
        }
    }

    p {
        // font-family: Georgia, Cambria, "Times New Roman", Times, serif;
        // font-size: 1.25em;
        // line-height: 1.58;
        margin-bottom: 1.25em;
        // font-weight: 400;
        letter-spacing: -.003em;
    }

    /* Responsive default image width */
    img {
        max-width: 100%;
        height: auto;
    }

    /* Responsive floating */
    @media only screen and (min-width: 720px)  {
        .butter-float-left {
            float: left;
            margin: 0px 10px 10px 0px;
        }

        .butter-float-right {
            float: right;
            margin: 0px 0px 10px 10px;
        }
    }

    /* Image caption */
    figcaption {
        font-style: italic;
        text-align: center;
        color: #ccc;
    }

    p code {
        // padding: 2px 4px;
        // font-size: 90%;
        // color: #c7254e;
        // background-color: #f9f2f4;
        // border-radius: 4px;
        // font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
    }

    pre {
        display: block;
        // padding: 1em;
        // margin: 0 0 2em;
        // font-size: 1em;
        // line-height: 1.4;
        word-break: break-all;
        word-wrap: break-word;
        // color: #333333;
        // background-color: #f5f5f5;
        // font-family: Menlo, Monaco,Consolas, "Courier New", monospace;
    }
}
  
  
`;
