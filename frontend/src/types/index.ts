import { useState } from "react";

export const OBJECT_ID_BEFORE_CREATION = -1;

export type Product = {
  id: number;
  name: string;
  supplier_email: string;
  count: number;
  price: number;
};

export type SetSort = React.Dispatch<
  React.SetStateAction<{
    name: "from-lowest" | "from-highest" | "";
    price: "from-lowest" | "from-highest" | "";
    current: "name" | "price";
  }>
>;
