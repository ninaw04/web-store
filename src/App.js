import React from "react";
import "./App.css";
import img from "./Images/sampleProductImg.png";
import ProductCard from "./Components/ProductCard";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        WEB STORE
      </header> */}
      <div className="products-list">
        <ProductCard name="Sample1" price="19.99" image={img} />
        <ProductCard name="Sample1" price="19.99" image={img} />
        <ProductCard name="Sample1" price="19.99" image={img} />
        <ProductCard name="Sample1" price="19.99" image={img} />
        <ProductCard name="Sample1" price="19.99" image={img} />
        <ProductCard name="Sample1" price="19.99" image={img} />
        <ProductCard name="Sample1" price="19.99" image={img} />
      </div>
    </div>
  );
}

export default App;
