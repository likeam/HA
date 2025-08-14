import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/tailwind.css";
import "./styles/urdu.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

serviceWorkerRegistration.register();
