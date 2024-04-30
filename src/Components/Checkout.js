import React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";

import ListItemView from "./ListItemView.js";
import CheckoutCard from "./CheckoutProductCard.js";
import Cookies from "js-cookie";
import axios from "axios";

export default function CheckoutPage(props) {
  console.log("HERE IN checkout page");
  const [user, setUser] = React.useState(null);
  const [street, setStreet] = useState("");
  const [aptNumber, setAptNumber] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const authCookie = Cookies.get("auth");
    if (authCookie) {
      const userInfo = JSON.parse(authCookie);
      setUser(userInfo);
      getAddress(userInfo.id);
    }
  }, []);

  async function getAddress(bid) {
    const response = await fetch(`http://localhost:3000/buyers/${bid}/address`);

    console.log(bid);
    const address = await response.json();
    console.log(address)
    setStreet(address[0].streetAdd);
    setAptNumber(address[0].aptNum);
    setCountry(address[0].country);
    setState(address[0].state);
    setCity(address[0].city);
    setZipcode(address[0].zip);
  }
 
  function displayCheckoutProducts() {

  }

  return (
    <div className="two-panel-checkout">
      <Grid container spacing={2}>
        <Grid className="payment-shipping-checkout" item xs={6}>
          <Box>
            <Box>
              <Typography>Your shipping Address is:</Typography>
              <Typography>{aptNumber}, {street}</Typography>
              <Typography>{city},  {state}, {zipcode}, {country}</Typography>
            </Box>
            <Typography>PAYMENT</Typography>
            <Card
              variant="outlined"
              sx={{
                maxHeight: "max-content",
                maxWidth: "100%",
                mx: "auto",
                // to make the demo resizable
                overflow: "auto",
                resize: "horizontal",
              }}
            >
              <Divider inset="none" />
              <CardContent
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
                  gap: 1.5,
                }}
              >
                <FormControl sx={{ gridColumn: "1/-1" }}>
                  <FormLabel>Card number</FormLabel>
                  <Input endDecorator={<CreditCardIcon />} />
                </FormControl>
                <FormControl>
                  <FormLabel>Expiry date</FormLabel>
                  <Input endDecorator={<CreditCardIcon />} />
                </FormControl>
                <FormControl>
                  <FormLabel>CVC/CVV</FormLabel>
                  <Input endDecorator={<InfoOutlined />} />
                </FormControl>
                <FormControl sx={{ gridColumn: "1/-1" }}>
                  <FormLabel>Card holder name</FormLabel>
                  <Input placeholder="Enter cardholder's full name" />
                </FormControl>
                {/* <Checkbox
                  label="Save card"
                  sx={{ gridColumn: "1/-1", my: 1 }}
                /> */}
                <CardActions sx={{ gridColumn: "1/-1" }}>
                  <Button variant="solid" color="primary">
                    Add card
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
            <Button>Pay Now</Button>
          </Box>
        </Grid>
        <Grid className="checkout-list" item xs={6}>
          <Box>
            {/* <CheckoutCard
              pid={1}
              name={"Muscle Lipstick"}
              price={15}
              image={"/assets/images/lipstick.jpg"}
              quantity={2}
            /> */}
            <ListItemView prev = {"/"}/>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginTop: "5vh",
              }}
            >
              <Typography>Subtotal</Typography>
              <Typography>{19.99 * 3}</Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Typography>Shipping</Typography>
              <Typography>{5}</Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Typography>Total</Typography>
              <Typography>{19.99 * 3 + 5}</Typography>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
