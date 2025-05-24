import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./features/CartSlice";
import { Link } from "react-router-dom";
import Header from "./Header";
import "./ShoppingCart.css";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cartItems
    .reduce((sum, item) => sum + item.quantity * item.price, 0)
    .toFixed(2);

  const handleQuantityChange = (id, amount) => {
    dispatch(updateQuantity({ id, amount }));
  };

  return (
    <>
      <Header />

      <div className="shopping-cart">
        <h2>Your Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <div className="quantity-controls">
                      <button onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity === 1}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                    </div>
                    <p>Subtotal: ${(item.quantity * item.price).toFixed(2)}</p>
                    <button className="delete-btn" onClick={() => dispatch(removeItem(item.id))}>❌ Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <p><strong>Total Items:</strong> {totalItems}</p>
              <p><strong>Total Cost:</strong> ${totalCost}</p>

              <button
                className="checkout-btn"
                onClick={() => alert("Checkout Coming Soon!")}
              >
                Checkout
              </button>
              <Link to="/products">
                <button className="continue-btn">Continue Shopping</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;
