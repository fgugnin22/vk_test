import React, { useState } from "react";
import "./table.css";
import TableHeaders from "../../TableHeaders/TableHeaders";

import ProductRow from "../ProductRow/ProductRow";
import { useAppSelector } from "../../store";

const Table: React.FC = () => {
  const products = useAppSelector((state) => state.main.products);

  const [search, setSearch] = useState("");

  const [sort, setSort] = useState<{
    name: "from-lowest" | "from-highest" | "";
    price: "from-lowest" | "from-highest" | "";
    current: "name" | "price";
  }>({
    name: "",
    price: "",
    current: "name"
  });

  const filteredAndOrderedProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((productA, productB) => {
      if (sort[sort.current] === "") {
        return 0;
      }

      if (sort.current === "name") {
        const comparison = productA.name.localeCompare(productB.name);
        return sort[sort.current] === "from-lowest" ? comparison : -comparison;
      }

      if (sort.current === "price") {
        const comparison = productA.price - productB.price;
        return sort[sort.current] === "from-lowest" ? comparison : -comparison;
      }

      return 0;
    });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <section className="table-root container">
      <h2 className="table-heading">Таблица товаров</h2>
      <div className="flex justify-between">
        <input className="search-bar" onChange={handleSearchChange} />
        <button className="add-product-btn">Добавить</button>
      </div>
      <div className="table-rows">
        <TableHeaders setSort={setSort} />
        {filteredAndOrderedProducts.map((product) => (
          <ProductRow
            key={`product-row-${product.id + product.name}`}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

export default Table;
