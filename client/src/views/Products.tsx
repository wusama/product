import React, { useEffect, useState } from "react";
import Menus from "../components/Menus";
import http from "../lib/http";
import { Product } from "../types";
import ProductCard from "../components/Product";
export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    http
      .get<Product[]>("/api/products")
      .then((res) => {
        setProducts(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <Menus />
      <h1>Products</h1>
      {products.length
        ? products.map((p) => <ProductCard product={p} />)
        : loading
        ? "Loading"
        : "No items"}
    </div>
  );
}
