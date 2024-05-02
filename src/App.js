import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { useState, createContext } from "react";

import CheckoutPage from "./Components/Checkout";
import Box from "@mui/material/Box";
import HomePage from "./Components/HomePage";
import RegisterPage from "./Components/Register";
import LoginPage from "./Components/Login";
import NavBar from "./Components/NavBar";
import ProfilePage from "./Components/ProfilePage"
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  typography:{

  },
  palette: {
    // mode: 'dark',
    background: {
      default: "#faf0e6"
    },
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

export const RangeContext = createContext();
export const FilterContext = createContext();
export const SearchContext = createContext();
export const TotalCartItems = createContext();

function App() {
  const [search, setSearch] = useState("");
  const [range, setRange] = useState([0, 1000]);
  const [totalCartItems, setTotalCartItems] = useState(0);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <SearchContext.Provider value={[search, setSearch]}>
          <RangeContext.Provider value={[range, setRange]}>
            <TotalCartItems.Provider value={[totalCartItems, setTotalCartItems]}>
              <NavBar></NavBar>
              <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="buyers/checkout" element={<CheckoutPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </TotalCartItems.Provider>
          </RangeContext.Provider>
        </SearchContext.Provider>
      </Box>
    </ThemeProvider>
    
  );
}

export default App;
