import React from "react";
import { Product } from "../../types";
import { formatPrice } from "../../util/convert";
import { useAppDispatch } from "../../store";
import { deleteProduct } from "../../store/thunks";
import { openModal } from "../../store/slice";

const ProductRow: React.FC<{ product: Product }> = (props: {
  product: Product;
}) => {
  const dispatch = useAppDispatch();

  const handleEditButtonClick = () => {
    dispatch(openModal({ product: props.product, operation: "EDIT" }));
  };

  const handleDeleteButtonClick = () => {
    dispatch(deleteProduct(props.product.id));
  };

  const formattedPrice = formatPrice(props.product.price);

  return (
    <div className="row">
      <div className="column column-lg">
        <button className="product-name" onClick={handleEditButtonClick}>
          {props.product.name}
        </button>
        <span className="product-count">{props.product.count}</span>
      </div>
      <div className="column column-sm">{formattedPrice}</div>
      <div className="column column-md">
        <button className="mutate-btn" onClick={handleEditButtonClick}>
          Редактировать
        </button>
        <button className="mutate-btn" onClick={handleDeleteButtonClick}>
          Удалить
        </button>
      </div>
    </div>
  );
};

export default ProductRow;
