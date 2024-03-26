import React from "react";
import Table from "./Table/Table";

import "../styles/resetter.css";
import "../styles/index.css";
import { Provider } from "react-redux";
import { store } from "../store";
import Modal from "./Modal/Modal";

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <main className="main">
        <Table />
        <Modal />
      </main>
    </Provider>
  );
};
