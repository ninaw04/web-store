import React, { useState, createContext } from "react";
import ProductPage from "./ProductPage";
import Box from "@mui/material/Box";
import NavBar from "./NavBar";
export const RangeContext = createContext();
export const FilterContext = createContext();
export const SearchContext = createContext();

export default function HomePage(props) {
  const [search, setSearch] = useState("");
  const [range, setRange] = useState([0, 1000]);

  return (
    
    <Box sx={{ display: "row" }}>
      <Box sx={{ display: "flex" }}>
        <ProductPage />
      </Box>
    </Box>
     
  );
}
