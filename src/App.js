import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom"

import CheckoutPage from "./Components/Checkout";
import ProductPage from "./Components/ProductPage";
import Box from '@mui/material/Box'
import Carousel from './Components/Carousel';
import HomePage from './Components/HomePage'
function App() {
  
  return (
    <Box>
      
        <Routes>

          <Route exact path="/" element = {<HomePage />} />
          <Route path = "buyers/checkout" element = {<CheckoutPage />} />
          
        </Routes>
    </Box>
    
  );
}

export default App;
