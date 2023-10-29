import App from "./App";
import "@src/config/config";
import { Provider } from "react-redux";
import { store } from "@src/store/store";
import { createRoot } from "react-dom/client";
import React from "react";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
