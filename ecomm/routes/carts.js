const express = require('express');
const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');
const cartShowTemplate = require('../views/carts/show');

const router = express.Router();

router.post('/cart/products', async (req, res) => {
  // Does the user already have a cart?
  let cart;
  if (req.session.cartId) {
    // If so, retrieve the cart from the repository
    cart = await cartsRepo.getOne(req.session.cartId);
  }

  // Check if there is not a valid cart
  // (either brand new customer or returning customer's cart is no longer valid)
  if (!cart) {
    // Create one
    cart = await cartsRepo.create({ items: [] });
    // Update the cookie with the new cartId
    req.session.cartId = cart.id;
  }

  // Check if added item is already in cart
  const existingItem = cart.items.find(
    (item) => item.id === req.body.productId
  );
  if (existingItem) {
    // Update the quantity
    existingItem.quantity++;
  } else {
    // Add the new item to the cart
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }

  // Update the cart
  await cartsRepo.update(cart.id, { items: cart.items });

  res.send('Product added!');
});

router.get('/cart', async (req, res) => {
  // No cartID, redirect to product page
  if (!req.session.cartId) {
    return res.redirect('/');
  }

  const cart = await cartsRepo.getOne(req.session.cartId);

  for (let item of cart.items) {
    const product = await productsRepo.getOne(item.id);
    item.product = product;
  }

  res.send(cartShowTemplate({ items: cart.items }));
});

module.exports = router;
