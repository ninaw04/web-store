import React, { useEffect, useState } from "react";
import "./App.css";
import CheckoutPage from "./Components/Checkout";
import ProductPage from "./Components/ProductPage";
import Box from '@mui/material/Box'
import Carousel from './components/Carousel';
import NavBar from './components/NavBar';

import Box from '@mui/material/Box'
import Carousel from './components/Carousel';
import NavBar from './components/NavBar';

function App() {
  
  return (
    <Box sx={{ display: 'flex' }}>
      <NavBar></NavBar>
      <Carousel></Carousel>
      <ProductPage />
      <div>CHECKOUT PAGE IGNORE ABOVE STUFF</div>
        <CheckoutPage />
    </Box>
    </Box>
  );
}

export default App;
