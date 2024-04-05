import React, { useEffect, useState } from "react";
import "./App.css";
import CheckoutPage from "./Components/Checkout";
import ProductPage from "./Components/ProductPage";
import Box from '@mui/material/Box'
import Carousel from './Components/Carousel';
import NavBar from './Components/NavBar';

function App() {
  
  return (
    <Box sx={{ display: 'row' }}>
      <NavBar></NavBar>
      <Carousel></Carousel>
      <ProductPage />
      <div>CHECKOUT PAGE IGNORE ABOVE STUFF</div>
        <CheckoutPage />
    </Box>
  );
}

export default App;
