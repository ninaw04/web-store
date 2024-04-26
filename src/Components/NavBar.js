import axios from 'axios'
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, Drawer } from '@mui/material';
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';

import { SearchContext } from './HomePage.js'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [input, setInput] = React.useState(null);

  const [search, setSearch] = React.useContext(SearchContext)

  const handleDrawerOpen = (event) => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  }

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClick = async e => {
    console.log(input)
    e.preventDefault()
    try {
      const res = await axios.get(`http://localhost:3000/products/search/${search}`)
      setSearch(res.data)
    } catch(err) {
      console.log(err)
    }
  }

  const Input = () => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        // console.log(event.target.value)
        // setInput(event.target.value)
        setSearch(event.target.value)
        // handleClick()
      }
    }
  
    return <TextField type="text" placeholder="Search products..." onKeyDown={handleKeyDown} />
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Web Store
          </Typography>
          <Search>
            {/* <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper> */}
            {/* <StyledInputBase
              placeholder="Search Products…"
              inputProps={{ 'aria-label': 'search' }}
            /> */}
            {/* <TextField onChange={handleChange} onKeyDown={handleKeyDown} placeholder="Search Products..."/> */}
            <Input/>
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }} >
            <IconButton edge='start' color="inherit" aria-label="open shopping cart"  onClick={handleDrawerOpen}>
              {/* cartAmount, setCartAmount = 4 
              useEffect [cartAmount] */}
              <Badge badgeContent={3} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose} >
              <Typography>
                Total Items in your CARRTTTT:
              </Typography>
              <Box sx={{ width: 1, height: 1, position: 'relative' }} justifyContent={'space-around'}>
                <Typography>
                  Display said items as (small?) product cards
                </Typography>
                {/* <NavLink to = {"buyers/checkout"}>  */}
                  <Button variant="contained"><Link to="buyers/checkout">Checkout</Link></Button>
                {/* </NavLink> */}
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
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}