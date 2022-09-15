import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://fakestoreapi.com/products"
      );
      setPosts(response.data);
      setLoading(false);
    };

    loadPosts();
  }, []);

  return (
    <div className="App">
      <h3>Search Filter</h3>
      <input
        style={{ width: "30%", height: "25px" }}
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchTitle(e.target.value)}
      />
      <div className = "products-container">{loading ? (
        <h4>Loading ...</h4>
      ) : (
        posts
          .filter((value) => {
            if (searchTitle === "") {
              return value;
            } else if (
              value.title.toLowerCase().includes(searchTitle.toLowerCase())
            ) {
              return value;
            }
          })
          .map((item) => {
            return (
              <div key={item.id} className="product-item">
                <div className="card"><img src={item.image} alt="#" /></div>
                <div className="card-description">
                  <h4 className="card-category">{item.category}</h4>
                  <h2 className="card-title">{item.title}</h2>
                  <h3 className="card-price">{`$${item.price}`}</h3>
                </div>
                </div>
            );
          })
      )}</div>
    </div>
  );
}

export default App;