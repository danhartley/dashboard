import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

if (process.env.NODE_ENV !== "production") {
  const { default: axe } = require("@axe-core/react");
  axe(React, ReactDOM, 1000);

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

  reportWebVitals(console.log);
}

const queryClient = new QueryClient();

ReactDOM.render(
  <div className="bg-twilight text-light">
    <React.StrictMode>
      <HashRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </HashRouter>
    </React.StrictMode>
  </div>,
  document.getElementById("root")
);
