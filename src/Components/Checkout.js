import React from "react";
import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import CheckoutCard from "./CheckoutProductCard";
// import img from "";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
// import Checkbox from "@mui/joy/Checkbox";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";

export default function CheckoutPage(props) {
  return (
    <div className="two-panel-checkout">
      <Grid container spacing={2}>
        <Grid className="payment-shipping-checkout" item xs={6}>
          <Box>
            <Typography>Your shipping Address is: bla bla</Typography>
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
            <CheckoutCard
              name="Sample 1"
              price={19.99}
              image={"assets/images/heels.jpg"}
              quantity={2}
            />
            <CheckoutCard
              name="Sample 2"
              price={19.99}
              image={"assets/images/lipstick.jpg"}
              quantity={1}
            />
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
