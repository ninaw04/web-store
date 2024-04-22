import React, { useEffect, useState } from "react";
import Carousel from './Carousel';
import ProductPage from "./ProductPage";
import Box from '@mui/material/Box'
import NavBar from './NavBar';

export default function HomePage(props) {
  return(
    <Box sx={{ display: 'row' }}>
        <NavBar></NavBar>
        <Carousel></Carousel>
        <ProductPage />
    </Box>
  )
}