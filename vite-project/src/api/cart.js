// src/api/cart.js
const API_URL = "http://localhost:3000/api";

export async function addToCart(token, productId, quantity = 1) {
  const res = await fetch(`${API_URL}/cart/item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ productId, quantity })
  });
  return res.json();
}
