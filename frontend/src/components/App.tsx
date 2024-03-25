import React from "react";
import Table from "./Table/Table";

import "./styles/resetter.css";
import "./styles/index.css";
import { Provider } from "react-redux";
import { store } from "../store";

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Table />
    </Provider>
  );
};
