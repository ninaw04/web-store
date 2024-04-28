import Carousel from "./Carousel";
import Filter from "./Filter";

import Box from "@mui/material/Box";
import React, { useEffect, useState, useContext } from "react";
import ProductCard from "./ProductCard";
import { RangeContext } from "./HomePage.js";
import { SearchContext } from "./HomePage.js";

export default function ProductPage() {
  const [range, setRange] = useContext(RangeContext);
  const [search, setSearch] = useContext(SearchContext);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");

  function handleCategoryFilter(cat) {
    setCategory(cat);
  }

  useEffect(() => {
    // console.log("rerendered");
    async function getProducts() {
      const data = {
        minCost: range[0],
        maxCost: range[1],
        search: search,
        category: category,
      };
      var response;

      if (search == "" && category != "") { // CATEGORY ONLY
        response = await fetch(
          `http://localhost:3000/products/category/filter/${range[0]}/${range[1]}/${category}`
        );
      } else if (category != "") { // CATEGORY AND SEARCH
        response = await fetch(
          `http://localhost:3000/products/filter/${range[0]}/${range[1]}/${category}/${search}`
        );
      } else { // SEARCH ONLY
        response = await fetch(
          `http://localhost:3000/products/filter/${range[0]}/${range[1]}/${search}`
        );
      }

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
  }, [range, search, category]);

  // console.log(products);
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
    <div>
      <Carousel handleCategoryFilter={handleCategoryFilter}></Carousel>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2, // padding
          position: "sticky",
          top: 0,
          zIndex: 9999,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <Filter />
      </Box>
      <div className="products-list">{displayProducts()}</div>
    </div>
  );
}
