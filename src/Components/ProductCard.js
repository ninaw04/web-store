import React, { useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CardActions from "@mui/material/CardActions";
import "../styles.css";
import { Link } from "react-router-dom";

import Cookies from "js-cookie";
function ProductCard(props) {
  const [count, setCount] = React.useState(0);
  const [userInfo, setUserInfor] = React.useState(null);
  
  useEffect(() => {
    const authCookie = Cookies.get("auth");
    if (authCookie) {
      const userInfo = JSON.parse(authCookie);
      setUserInfor(userInfo);
    }
  }, []);

  async function handleRemove() {
    const newCount = count - 1;
    setCount(newCount);

    if (newCount >= 0) {
      try {
        if (newCount == 0) {
          console.log("deleting");
          await axios.delete(
            `http://localhost:3000/buyers/cart/${userInfo.id}/${props.pid}`
          );
        }
        if (newCount > 0) {
          console.log("subtracting");
          await axios.put(`http://localhost:3000/buyers/cart`, {
            buyerId: userInfo.id,
            productId: props.pid,
            amount: newCount,
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Cannot add negative items to cart");
    }
  }

  async function handleAdd() {
    const newCount = count + 1;
    setCount(newCount);

    try {
      if (newCount === 1) {
        console.log(userInfo.id, props.pid)
        const response = await axios.post(`http://localhost:3000/buyers/cart`, {
          "buyerId": userInfo.id,
          "productId": props.pid
        });
        console.log("first data end")

      }
      if (newCount > 1) {
        console.log("adding data")
        const response = await axios.put(`http://localhost:3000/buyers/cart`, {
          "buyerId": userInfo.id,
          "productId": props.pid,
          "amount": newCount,
        });
      }
    } catch (error) {
      console.log("PROBLEM")
      console.log(error);
    }
    console.log("post made");
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
      <CardActionArea>
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
      </CardActionArea>
      <CardActions className="shopping-cart">
        {userInfo ? (
          <Button
            onClick={async () => {
              await handleRemove();
            }}
            endIcon={<RemoveIcon />}
          ></Button>
        ) : (
          <div>
            <Link to="/login">
              <Button
                onClick={async () => {
                  await handleRemove();
                }}
                startIcon={<RemoveIcon />}
              ></Button>
            </Link>
          </div>
        )}

        <Typography>{count}</Typography>
        {userInfo ? (
          <Button
            onClick={async () => {
              await handleAdd();
            }}
            endIcon={<AddIcon />}
          ></Button>
        ) : (
          <div>
            <Link to="/login">
              <Button
                onClick={async () => {
                  await handleAdd();
                }}
                endIcon={<AddIcon />}
              ></Button>
            </Link>
          </div>
        )}
      </CardActions>
    </Card>
  );
}

export default ProductCard;
