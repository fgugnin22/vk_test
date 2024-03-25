import React from "react";
import { Product } from "../../types";
import { formatPrice } from "../../util/convert";

const ProductRow: React.FC<{ product: Product }> = (props: {
  product: Product;
}) => {
  const formattedPrice = formatPrice(props.product.price);
  return (
    <div className="row">
      <div className="column column-lg">
        <button className="product-name">{props.product.name}</button>
        <span className="product-count">{props.product.count}</span>
      </div>
      <div className="column column-sm">{formattedPrice}</div>
      <div className="column column-md">
        <button className="mutate-btn">Редактировать</button>
        <button className="mutate-btn">Удалить</button>
      </div>
    </div>
  );
};

export default ProductRow;
