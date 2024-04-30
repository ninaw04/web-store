import * as React from "react";

import { useEffect } from "react";
import Cookies from "js-cookie";
import {Box} from "@mui/material";
import CheckoutCard from "./CheckoutProductCard.js";

export default function ListCartItemView(props) {
  const [user, setUser] = React.useState(null);
  const base = props.prev;
  const [cartProducts, setCartProducts] = React.useState([]);
  useEffect(() => {
    const authCookie = Cookies.get("auth");
    if (authCookie) {
      const userInfo = JSON.parse(authCookie);
      setUser(userInfo);
      getCart(userInfo);

    }
    return;
  }, []);
  async function getCart(user) {
    console.log("user:")
    console.log(user)
    const response = await fetch(`http://localhost:3000/buyers/${user.id}/cart`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    const prods = await response.json();
    setCartProducts(prods);
    console.log(prods);
  }
  function displayProducts(props) {
    console.log("inside display rpoducts");
    console.log(cartProducts)

    return cartProducts.map((item) => {
      return (
        <CheckoutCard
          pid={item.productId}
          name={item.productName}
          price={item.price}
          image={base + item.imgUrl}
          quantity={item.amount}
        />
      );
    });
  }
  return (
    <Box className="cart-list">{displayProducts()}</Box>
  )
}