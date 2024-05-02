import React, { useEffect } from "react";
import axios from "axios";
// import { CardActionArea, CardMedia, CardContent, Typography, Popover } from '@material-ui/core';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from '@mui/material/CardActionArea';
import Popover from "@mui/material/Popover";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CardActions from "@mui/material/CardActions";
import "../styles.css";
import { Link } from "react-router-dom";
import { TotalCartItems } from "../App.js";

import Cookies from "js-cookie";
function ProductCard(props) {
  const [count, setCount] = React.useState(0);
  const [userInfo, setUserInfor] = React.useState(null);
  const [userID, setUserID] = React.useState(null)
  const [totalCartItems, setTotalCartItems] = React.useContext(TotalCartItems);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    const authCookie = Cookies.get("auth");
    if (authCookie) {
      const userInfo = JSON.parse(authCookie);
      setUserInfor(userInfo);
      // setUserID(userInfo.id)
      // getTotalCart(userInfo); 
    }
    return;
  }, []);

  async function handleRemove() {
    if (count == 0) {
      alert("cannot have negative items")
    }
    else {
      const newCount = count - 1;
      setCount(newCount);
      
    }
    
  }

  async function getTotalCart(user) {
    console.log("inside get total cart" + user)
    console.log(user)
    // console.log(userInfo.id)
    try{
      console.log("this is what it has come to" + user)
      var response = await axios.get(`http://localhost:3000/buyers/definite/total/cart/${user.id}`);
      console.log(response)
      // const totalCart = await response.json(); // this shouldnt run if the response isnt ok
      setTotalCartItems(response);
    }
    catch (error) {
      console.log("naurrr not getting total cart");
      console.log(error);
      return
    }
    
  }
  

  async function addToCart() {
    // getTotalCart()
    console.log(count)
    try {
      if (count === 0) {
        console.log("deleting");
        await axios.delete(
          `http://localhost:3000/buyers/cart/${userInfo.id}/${props.pid}`
        );
      }
      else if (count >=  1) {
        console.log("what is this" + userInfo.id, props.pid);
        const response = await axios.post(`http://localhost:3000/buyers/cart`, {
          buyerId: userInfo.id,
          productId: props.pid,
          amount: count
        });
        console.log("first data end");
      }
      
      // update cart
      // const amount = await axios.get(`http://localhost:3000/buyers/total/cart/${userInfo.id}`);
      // setTotalCartItems(amount.data);

      // getTotalCart();

    } catch (error) {
      console.log("PROBLEM");
      console.log(error);
      return
    }
    console.log("done")
  }

  function handleAdd() {
    const newCount = count + 1;
    setCount(newCount);
  }
  // const fileUrl = require("" + props.image);

  return (
    <Card
      className="product-card"
      elevation={10}
      sx={{
        transition: "all 0.5s ease-in-out",
        "&:hover": {
          transform: "scale(1.10)",
        },
      }}
    >
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="320"
          image={props.image}
          alt="Product Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body" color="text.secondary">
            {props.price}
          </Typography>
        </CardContent>
        {/* <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }} */}
        {/* // style={{ backgroundColor: 'lightblue', color: 'white', padding: '10px', maxWidth: '200px', maxHeight: '200px', overflow: 'auto'}}
        // style={{ maxWidth: '500px', maxHeight: '500px', overflow: 'auto' }}
        // >
          <Typography>somethingsomething</Typography>
        </Popover> */}
      </CardActionArea>
      <CardActions className="shopping-cart">
        {userInfo ? (
          <Button
            onClick={() => {
              handleRemove();
            }}
            endIcon={<RemoveIcon />}
          ></Button>
        ) : (
          <div>
            <Link to="/login">
              <Button
                onClick={() => {
                  handleRemove();
                }}
                startIcon={<RemoveIcon />}
              ></Button>
            </Link>
          </div>
        )}

        <Typography>{count}</Typography>
        {userInfo ? (
          <Button
            onClick={() => {
              handleAdd();
            }}
            endIcon={<AddIcon />}
          ></Button>
        ) : (
          <div>
            <Link to="/login">
              <Button
                onClick={() => {
                  handleAdd();
                }}
                endIcon={<AddIcon />}
              ></Button>
            </Link>
          </div>
        )}
        <Button onClick = {async () => {addToCart()}}>Add to Cart</Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
