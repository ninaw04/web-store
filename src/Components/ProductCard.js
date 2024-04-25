import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CardActions from "@mui/material/CardActions";
import "../styles.css";

function ProductCard(props) {

  const [count, setCount] = React.useState(0);
  function handleRemove() {
    if (count > 0) {
      setCount(count - 1);
    } else {
      alert("Cannot add negative items to cart");
    }
  }
  function handleAdd() {
    
    setCount(count + 1);
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
\
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
        <Button
          onClick={() => handleRemove()}
          startIcon={<RemoveIcon />}
        ></Button>
        <Typography>{count}</Typography>
        <Button onClick={() => handleAdd()} endIcon={<AddIcon />}></Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
