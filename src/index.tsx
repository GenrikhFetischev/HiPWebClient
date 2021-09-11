import React from "react";
import { render } from "react-dom";
import { App } from "./Components/App/App";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

const appContainer = document.createElement("div");
document.body.append(appContainer);

render(<App />, appContainer);
