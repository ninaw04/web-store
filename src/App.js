import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { useState, createContext } from "react";

import CheckoutPage from "./Components/Checkout";
import Box from "@mui/material/Box";
import HomePage from "./Components/HomePage";
import RegisterPage from "./Components/Register";
import LoginPage from "./Components/Login";
import NavBar from "./Components/NavBar";
export const RangeContext = createContext();
export const FilterContext = createContext();
export const SearchContext = createContext();
function App() {
  const [search, setSearch] = useState("");
  const [range, setRange] = useState([0, 1000]);
  return (
    <Box>
      <SearchContext.Provider value={[search, setSearch]}>
        <RangeContext.Provider value={[range, setRange]}>
          <NavBar></NavBar>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="buyers/checkout" element={<CheckoutPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </RangeContext.Provider>
      </SearchContext.Provider>
    </Box>
  );
}

export default App;
