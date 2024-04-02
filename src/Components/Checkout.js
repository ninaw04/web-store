import React from "react";
import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import CheckoutCard from "./CheckoutProductCard"
import img from "../Images/sampleProductImg.png";

export default function CheckoutPage(props) {
  return (
    <div className="two-panel-checkout">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box backgroundColor="blue">
            <Typography>Your shipping Address is: bla bla</Typography>
            <Typography>Enter Credit Card Information</Typography>
            <Typography>PAY NOW</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box backgroundColor="red">
            <CheckoutCard name="Sample1" price="19.99" image={img} />
            <Typography>Subtotal</Typography>
            <Typography>Shipping</Typography>
            <Typography>Total</Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
