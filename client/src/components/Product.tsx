import React from "react";
import { Box } from "@mui/material";
import { Product } from "../types";

type Props = {
  product: Product;
};
export default function ProductCard(props: Props) {
  const { product } = props;
  return (
    <Box sx={{ border: "1px solid #ddd", p: 4 }}>
      <Box>name:{product.name}</Box>
      <Box>price:{product.price}</Box>
    </Box>
  );
}
