import React from "react";
import "./table.css";
import TableHeaders from "../../TableHeaders/TableHeaders";

const Table = () => {
  return (
    <section className="table-root container">
      <h2 className="table-heading">Таблица товаров</h2>
      <div className="flex justify-between">
        <input className="search-bar" />
        <button className="add-product-btn">Добавить</button>
      </div>
      <div className="table-rows">
        <TableHeaders />
      </div>
    </section>
  );
};

export default Table;
