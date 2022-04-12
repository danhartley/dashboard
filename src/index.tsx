import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

if (process.env.NODE_ENV !== 'production') {
    const {default: axe} = require('@axe-core/react');
    axe(React, ReactDOM, 1000);

    // If you want to start measuring performance in your app, pass a function
    // to log results (for example: reportWebVitals(console.log))
    // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

    reportWebVitals(console.log);

  }

ReactDOM.render(
  <div className="dark:bg-slate-900 dark:text-white">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </div>,
  document.getElementById("root")
);
