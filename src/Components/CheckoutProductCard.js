import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CardActions from "@mui/material/CardActions";
import "../styles.css";
function CheckoutCard(props) {
  return (
    <Card elevation={10} sx={{ display: "flex", flexDirection: "row" }}>
      <CardMedia
        component="img"
        image={props.image}
        alt="Product Image"
        sx={{
          width: "100px",
          height: "100px",
          objectFit: "contain",
        }}
      />
      <Typography gutterBottom variant="h5" component="div">
        {props.name}
      </Typography>
      <Typography variant="body" color="text.secondary">
        {props.price}
      </Typography>
    </Card>
  );
}

export default CheckoutCard;
