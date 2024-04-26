import "./App.css";
import { Routes, Route } from "react-router-dom"

import CheckoutPage from "./Components/Checkout";
import Box from '@mui/material/Box'
import HomePage from './Components/HomePage'
import RegisterPage from './Components/Register'
import LoginPage from './Components/Login'

function App() {
  
  return (
    <Box>
      
        <Routes>

          <Route exact path="/" element = {<HomePage />} />
          <Route path = "buyers/checkout" element = {<CheckoutPage />} />
          <Route path = "/register" element={<RegisterPage />}/>
          <Route path = "/login" element={<LoginPage/>}/>
          
        </Routes>
    </Box>
    
  );
}

export default App;
