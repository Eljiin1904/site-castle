import "./config";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@client/styles/defaults.scss";
import { App } from "./App";
import "@client/styles/styled.scss";
const container = document.getElementById("root");
const root = createRoot(container as HTMLDivElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);