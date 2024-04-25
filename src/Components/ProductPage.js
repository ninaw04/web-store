import React, { useEffect, useState, useContext } from "react";
import ProductCard from "./ProductCard";
import {RangeContext} from './HomePage.js'
import { Button, Typography } from "@mui/material";

export default function ProductPage() {
  const [range, setRange] = useContext(RangeContext);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    console.log("rerendered")
    async function getProducts() {
      const data = {
        minCost: range[0],
        maxCost: range[1]
      }
      const response = await fetch(`http://localhost:3000/products/filter/${range[0]}/${range[1]}`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const prods = await response.json();
      setProducts(prods);
    }
    getProducts();
    return;
  }, [range]);

  console.log(products);
  function displayProducts() {
    return products.map((item) => {
      return (
        <ProductCard
          pid={item.productId}
          name={item.productName}
          price={item.price}
          image={item.imgUrl}
        />
      );
    });
  }
  return (
    <div className="products-list">
      {displayProducts()}
    </div>
  );
}
