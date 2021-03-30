import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./utils/store";

ReactDOM.render(
  <App>
    <Provider store={store}>
      <App />
    </Provider>
  </App>,
  document.getElementById("root")
);
