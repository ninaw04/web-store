import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import Badge from "@mui/material/Badge";
import "../styles.css";
function CheckoutCard(props) {
  return (
    <Card
      elevation={10}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Badge color="secondary" overlap="circular" badgeContent={props.quantity}>
        <CardMedia
          component="img"
          image={props.image}
          alt="Product Image"
          sx={{
            width: "100px",
            height: "100px",
            objectFit: "contain",
            margin: "15px",
            border: "solid",
            borderWidth: "2px",
            borderRadius: "2px",
          }}
        />
        {/* <MailIcon /> */}
      </Badge>

      <Typography gutterBottom variant="h5" component="div">
        {props.name}
      </Typography>
      <Typography variant="body" color="text.secondary">
        {props.price*props.quantity}
      </Typography>
    </Card>
  );
}

export default CheckoutCard;