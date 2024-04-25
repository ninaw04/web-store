import React, { useEffect, useState, useContext, createContext } from "react";
import Carousel from "./Carousel";
import ProductPage from "./ProductPage";
import Box from "@mui/material/Box";
import NavBar from "./NavBar";
import Filter from "./Filter";
export const RangeContext = createContext();

export default function HomePage(props) {
  const [range, setRange] = useState([0, 200]);
  return (
    <RangeContext.Provider value = {[range, setRange]}>
      <Box sx={{ display: "row" }}>
        <NavBar></NavBar>
        <Carousel></Carousel>
        <Box sx={{ display: "flex" }}>
          <Filter />
          <ProductPage />
        </Box>
      </Box>
    </RangeContext.Provider>
  );
}
