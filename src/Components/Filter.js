import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Button, Typography } from "@mui/material";
import {RangeContext} from './HomePage.js'
export default function Filter() {

  
  const [value, setValue] = useContext(RangeContext);
  function valuetext(value) {
    return `${value}$`;
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);

  };
  return (

    <Box>
      Filter Products by Price: 
      
      <Box sx={{ width: 300 }}>
        <Slider
          getAriaLabel={() => "Price range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min = {0}
          max = {1000}
        />
      </Box>
      <Typography> Min Range ($): {value[0]}</Typography>
      <Typography> Max Range ($): {value[1]}</Typography>
    </Box>
  );
}
