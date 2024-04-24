import "./App.css";
import { Routes, Route } from "react-router-dom"

import CheckoutPage from "./Components/Checkout";
import Box from '@mui/material/Box'
import HomePage from './Components/HomePage'
function App() {
  
  return (
    <Box>
      
        <Routes>

          <Route exact path="/" element = {<HomePage />} />
          <Route path = "buyers/checkout" element = {<CheckoutPage />} />
          
        </Routes>
    </Box>
    
  );
}

export default App;
