import React, { useState, createContext } from "react";
import Carousel from "./Carousel";
import ProductPage from "./ProductPage";
import Box from "@mui/material/Box";
import NavBar from "./NavBar";
import Filter from "./Filter";
export const RangeContext = createContext();
export const FilterContext = createContext();
export const SearchContext = createContext();

export default function HomePage(props) {
  const [search, setSearch] = useState("");
  const [range, setRange] = useState([0, 1000]);

  return (
    <SearchContext.Provider value={[search,setSearch]}>
      <RangeContext.Provider value={[range, setRange]}>
        <Box sx={{ display: "row" }}>
          <NavBar></NavBar>
          <Carousel></Carousel>
          <Box sx={{ display: "flex" }}>
            <Filter />
            <ProductPage />
          </Box>
        </Box>
      </RangeContext.Provider>
    </SearchContext.Provider>
  );
}
