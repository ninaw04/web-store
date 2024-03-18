import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CardActions from "@mui/material/CardActions";
import "../styles.css";
function ProductCard(props) {
  return (
    <Card
      className="product-card"
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
          height="300"
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
        <Button variant="contained" endIcon={<AddShoppingCartIcon />}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
