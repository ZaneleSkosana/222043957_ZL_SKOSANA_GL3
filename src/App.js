import React, { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
  }

  return (
    <div style={{ padding: "10px" }}>
      <h1>Product Catalogue</h1>
      <input
        type="text"
        placeholder="Find products..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ padding: "5px", marginBottom: "10px" }}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Failed to load products.</p>}
      {!loading && filteredProducts.length === 0 && (
        <p>Sorry, no matching products.</p>
      )}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid black",
              padding: "8px",
              width: "180px",
              margin: "5px",
              textAlign: "center",
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "80px", height: "80px" }}
            />
            <h3 style={{ fontSize: "14px" }}>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
