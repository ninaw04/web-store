import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      const response = await fetch(`http://localhost:3000/products`);
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
  }, [products.length]);

  console.log(products);
  function displayProducts() {
    return products.map((item) => {
      return (
        <ProductCard pid = {item.productId} name={item.productName} price={item.price} image={item.imgUrl} />
      )
    });
  }
  return (
    <div className="products-list">
      {displayProducts()}
    </div>
  )
}
