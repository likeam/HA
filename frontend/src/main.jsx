import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./styles/main.css";
import "./styles/rtl.css";
import "./styles/print.css";
import store from "./app/store";
import { registerServiceWorker } from "./serviceWorker";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

// Register service worker
registerServiceWorker();
