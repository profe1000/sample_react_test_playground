import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { BasicContextProvider } from "./context/BasicContext";
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <ConfigProvider theme={{ token: {
      colorPrimary: "#9E0059", colorInfo: "#9E0059", colorLink: "#9E0059",
      colorText: "#23001E", colorTextSecondary: "#A08B99",
      colorBgLayout: "#F5F2F0", colorBorder: "#E7DFDB", colorWarning: "#F0A84A",
    } }}>
      <BasicContextProvider><App /></BasicContextProvider>
    </ConfigProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
