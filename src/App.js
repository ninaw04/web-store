import React, { useEffect, useState } from "react";
import "./App.css";
import CheckoutPage from "./Components/Checkout";
import ProductPage from "./Components/ProductPage";
import Box from '@mui/material/Box'
import Carousel from './Components/Carousel';
import NavBar from './Components/NavBar';

function App() {
  
  return (
    <Box>
      <NavBar></NavBar>
      <Box sx={{ display: 'row' }}>
        <Carousel></Carousel>
        <ProductPage />
        <div>CHECKOUT PAGE IGNORE ABOVE STUFF</div>
          <CheckoutPage />
      </Box>
    </Box>
    
  );
}

export default App;
