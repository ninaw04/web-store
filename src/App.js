import React, { useEffect, useState } from "react";
import "./App.css";
import CheckoutPage from "./Components/Checkout";
import ProductPage from "./Components/ProductPage";
function App() {
  
  return (
    <div className="App">
      <ProductPage />
      <div>CHECKOUT PAGE IGNORE ABOVE STUFF</div>
      <div>
        <CheckoutPage />
      </div>
    </div>
  );
}

export default App;
