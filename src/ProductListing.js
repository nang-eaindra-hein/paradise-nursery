import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./features/CartSlice";
import Header from "./Header";
import "./ProductListing.css";

const plants = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    price: 25.99,
    image: process.env.PUBLIC_URL + "/plants/monstera.jpg",
    category: "Tropical",
    description: "Monstera has iconic split leaves and thrives in bright, indirect sunlight. A bold statement plant."
  },
  {
    id: 2,
    name: "Snake Plant",
    price: 19.99,
    image: process.env.PUBLIC_URL + "/plants/snake.jpg",
    category: "Air Purifying",
    description: "Snake plants are incredibly low maintenance and filter toxins from the air. Great for beginners."
  },
  {
    id: 3,
    name: "Peace Lily",
    price: 22.5,
    image: process.env.PUBLIC_URL + "/plants/peace.jpg",
    category: "Flowering",
    description: "Peace Lilies bloom white flowers and enjoy shady spots. Known for improving indoor air quality."
  },
  {
    id: 4,
    name: "Pothos",
    price: 15.0,
    image: process.env.PUBLIC_URL + "/plants/pothos.jpg",
    category: "Air Purifying",
    description: "Pothos is a trailing plant with heart-shaped leaves. Perfect for hanging baskets or shelves."
  },
  {
    id: 5,
    name: "Aloe Vera",
    price: 12.75,
    image: process.env.PUBLIC_URL + "/plants/aloe.jpg",
    category: "Succulents",
    description: "Aloe is a soothing succulent that stores water and has medicinal gel in its leaves. Loves sunlight."
  },
  {
    id: 6,
    name: "Fiddle Leaf Fig",
    price: 29.5,
    image: process.env.PUBLIC_URL + "/plants/fig.jpg",
    category: "Tropical",
    description: "Fiddle Leaf Fig is a tall beauty with large glossy leaves. Loves bright, consistent lighting."
  },
];

const ProductListing = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedPlantId, setExpandedPlantId] = useState(null);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isInCart = (id) => cartItems.some((item) => item.id === id);

  const categories = ["All", ...new Set(plants.map((p) => p.category))];

  const filteredPlants =
    selectedCategory === "All"
      ? plants
      : plants.filter((p) => p.category === selectedCategory);

  const toggleDescription = (id) => {
    setExpandedPlantId(expandedPlantId === id ? null : id);
  };

  // ✅ Correct GitHub Pages background image
  const backgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/plants/plants.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    position: 'relative'
  };

  return (
    <>
      <div className="ProductListing-page" style={backgroundStyle}>
        <div className="overlay">
          <Header />

          <div className="product-listing">
            <h2>Our Plants</h2>

            <div className="dropdown-container">
              <label htmlFor="category-select">Filter by Category: </label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="plant-grid">
              {filteredPlants.map((plant) => (
                <div className="plant-card" key={plant.id}>
                  <img src={plant.image} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p>${plant.price.toFixed(2)}</p>

                  <button
                    className="add-to-cart-btn"
                    onClick={() => dispatch(addItem(plant))}
                    disabled={isInCart(plant.id)}
                  >
                    {isInCart(plant.id) ? "Added" : "Add to Cart"}
                  </button>

                  <button
                    className="see-more-btn"
                    onClick={() => toggleDescription(plant.id)}
                  >
                    {expandedPlantId === plant.id ? "Hide" : "See More"}
                  </button>

                  {expandedPlantId === plant.id && (
                    <p className="plant-description">{plant.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListing;
