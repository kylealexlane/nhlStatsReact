import React from "react";
import { render } from "react-dom";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import "./styles/global-styles";
import "./styles/global.less";
import registerServiceWorker from "registerServiceWorker";
import theme from "./styles/theme";
import configureStore from "./store";

import Routes from "./routes";

render(
  <Provider store={configureStore()}>
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
