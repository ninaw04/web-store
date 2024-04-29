import * as React from "react";
import { useEffect } from "react";
import {
  AppBar,
  Drawer,
  Box,
  Button,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Menu,
  TextField,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { SearchContext } from "./HomePage.js";
import Cookies from "js-cookie";
import CheckoutCard from "./CheckoutProductCard.js";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [search, setSearch] = React.useContext(SearchContext);
  const [user, setUser] = React.useState(null);
  const [cartProducts, setCartProducts] = React.useState([]);

  const handleDrawerOpen = (event) => {
    getCart();
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const Input = () => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        setSearch(event.target.value);
      }
    };
    return (
      <TextField
        type="text"
        placeholder="Search products..."
        onKeyDown={handleKeyDown}
      />
    );
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  async function getCart() {
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

  useEffect(() => {
    const authCookie = Cookies.get("auth");
    if (authCookie) {
      const userInfo = JSON.parse(authCookie);
      setUser(userInfo);
    }
    return;
  }, []);

  const handleLogout = () => {
    Cookies.remove("auth");
    sessionStorage.removeItem("auth");
    setUser(null);
  };

  function displayProducts() {
    console.log("inside display rpoducts");
    console.log(cartProducts)
    return cartProducts.map((item) => {
      return (
        <CheckoutCard
          pid={item.productId}
          name={item.productName}
          price={item.price}
          image={item.imgUrl}
        />
      );
    });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Muscle Mommies
          </Typography>
          <Search>
            <Input />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {user == null ? (
              <Button variant="text" color="inherit" href="/login">
                Sign in
              </Button>
            ) : (
              <Button variant="text" color="inherit" onClick={handleLogout}>
                Sign out
              </Button>
            )}

            <IconButton
              edge="start"
              color="inherit"
              aria-label="open shopping cart"
              onClick={handleDrawerOpen}
            >
              {/* cartAmount, setCartAmount = 4 
              useEffect [cartAmount] */}
              <Badge badgeContent={3} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Drawer
              anchor="right"
              open={isDrawerOpen}
              onClose={handleDrawerClose}
            >
              <Typography>Total Items in your CARRTTTT:</Typography>
              <Box
                sx={{ width: 1, height: 1, position: "relative" }}
                justifyContent={"space-around"}
              >
                <Box className="cart-list">{displayProducts()}</Box>
                <Typography>
                  Display said items as (small?) product cards
                </Typography>
                <Button variant="contained">
                  <Link to="buyers/checkout">Checkout</Link>
                </Button>
              </Box>
            </Drawer>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}></Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
