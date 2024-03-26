import React from "react";
import img from "../../public/triangle.svg";
import { SetSort } from "../../types";

type TableHeadersProps = {
  setSort: SetSort;
};

const TableHeaders: React.FC<TableHeadersProps> = (
  props: TableHeadersProps
) => {
  const handleFilterButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    columnName: "name" | "price"
  ) => {
    props.setSort((prev) => {
      const button = e.target as HTMLButtonElement;

      prev = {
        ...prev,
        [prev.current === "name" ? "price" : "name"]: "",
        current: columnName,
        [columnName]:
          prev[columnName] === "from-lowest" ? "from-highest" : "from-lowest"
      };

      button.style.transform = `rotate(${
        prev[columnName] === "from-highest" ? "180deg" : "0deg"
      })`;

      button.style.transitionDuration = "300ms";

      return prev;
    });
  };

  return (
    <div className="row">
      <div className="column column-lg">
        Название
        <button
          className="filter-btn"
          onClick={(e) => handleFilterButtonClick(e, "name")}
        >
          <img width={35} data-size="35px" src={img} alt="Filter button." />
        </button>
      </div>
      <div className="column column-sm">
        Стоимость
        <button
          className="filter-btn"
          onClick={(e) => handleFilterButtonClick(e, "price")}
        >
          <img width={35} data-size="35px" src={img} alt="Filter button." />
        </button>
      </div>
      <div className="column column-md">Действия</div>
    </div>
  );
};

export default TableHeaders;
