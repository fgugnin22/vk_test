import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { closeModal } from "../../store/slice";

import "./modal.css";
import { formatPrice } from "../../util/convert";
import { OBJECT_ID_BEFORE_CREATION } from "../../types";
import { addProduct, editProduct } from "../../store/thunks";

const Modal: React.FC = () => {
  const dispatch = useAppDispatch();

  const modalState = useAppSelector((state) => state.main.modal);

  const [formState, setFormState] = useState({
    name: modalState.details?.name ?? "",
    supplier_email: modalState.details?.supplier_email ?? "",
    count: modalState.details?.count ?? 1,
    price: formatPrice(modalState.details?.price ?? 0)
  });

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    setFormState((prev) => ({ ...prev, [target.name]: target.value }));

    target.setCustomValidity("");
  };

  const handlePriceInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    target.setCustomValidity("");

    const allowedPattern = /^[0-9,.\$]*$/;

    if (!allowedPattern.test(target.value)) {
      return;
    }

    setFormState((prev) => ({ ...prev, price: target.value }));
  };

  const handleCloseModalButtonClick = () => {
    dispatch(closeModal());
  };

  const handleBackdropClick = () => {
    dispatch(closeModal());
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      ...formState,
      price: parseFloat(
        formState.price.replaceAll(",", "").replaceAll("$", "")
      ),
      id: OBJECT_ID_BEFORE_CREATION
    };

    if (modalState.operation === "EDIT" && modalState.details !== null) {
      formData.id = modalState.details.id;

      dispatch(editProduct(formData));
      return;
    }

    dispatch(addProduct(formData));
  };

  const handleInputInvalid = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    switch (true) {
      case input.name === "name":
        input.setCustomValidity(
          "В названии товара должен содержаться хотя бы один символ, отличный от пробела!"
        );
        break;
      case input.name === "supplier_email":
        input.setCustomValidity("Введите почту в корректном формате!");
        break;
      case input.name === "price":
        input.setCustomValidity("Введите стоимость в формате USD!");
        break;
    }
  };

  // const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {};

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.name === "name") {
      const regex = /\S/;

      if (!regex.test(e.target.value)) {
        e.target.setCustomValidity(
          "В названии товара должен содержаться хотя бы один символ, отличный от пробела!"
        );
      }
    }

    e.target.reportValidity();
  };

  useEffect(() => {
    setFormState({
      name: modalState.details?.name ?? "",
      supplier_email: modalState.details?.supplier_email ?? "",
      count: modalState.details?.count ?? 1,
      price: formatPrice(modalState.details?.price ?? 0)
    });
  }, [modalState.details]);

  if (!modalState.isOpen) {
    return null;
  }

  const submitButtonText =
    modalState.operation === "ADD" ? "Добавить" : "Обновить";
  return (
    <>
      <form className="modal-root" onSubmit={handleFormSubmit}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={handleCloseModalButtonClick}
        ></button>
        <label className="modal-form-label" htmlFor="name">
          <span>Название: </span>
          <input
            className="modal-form-input"
            type="text"
            onChange={handleInputChange}
            onInvalid={handleInputInvalid}
            // onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            value={formState.name}
            name="name"
            id="name"
            required
          />
        </label>
        <label className="modal-form-label" htmlFor="supplier_email">
          <span>Почта поставщинка: </span>
          <input
            className="modal-form-input"
            type="email"
            onChange={handleInputChange}
            onInvalid={handleInputInvalid}
            // onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            value={formState.supplier_email}
            name="supplier_email"
            id="supplier_email"
            pattern="^[\w]{1,}@[\w]{1,}\.[a-z]{2,}$"
            required
          />
        </label>
        <label className="modal-form-label" htmlFor="count">
          <span>Количество: </span>
          <input
            className="modal-form-input"
            type="number"
            onChange={handleInputChange}
            onInvalid={handleInputInvalid}
            // onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            value={formState.count}
            name="count"
            id="count"
            min={1}
            required
          />
        </label>
        <label className="modal-form-label" htmlFor="price">
          <span>Стоимость: </span>
          <input
            className="modal-form-input"
            type="text"
            onChange={handlePriceInputChange}
            onInvalid={handleInputInvalid}
            // onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            value={formState.price}
            name="price"
            id="price"
            pattern="^\$\d{1,3}(,\d{3})*(\.\d{2})?$"
            required
          />
        </label>
        <button className="modal-form-submit-btn" type="submit">
          {submitButtonText}
        </button>
      </form>
      <div className="modal-backdrop" onClick={handleBackdropClick}></div>
    </>
  );
};

export default Modal;
