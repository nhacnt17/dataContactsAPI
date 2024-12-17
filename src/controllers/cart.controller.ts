import { Cart } from "../entities/cart/cart.entities";
import { Product } from "../entities/product/Product.entities";

let AppDataSource = require('../database');


const cartRepository = AppDataSource.getRepository(Cart);

const CartController = {
    // Lấy danh sách sản phẩm trong giỏ hàng theo deviceId
    getList: async (req: any, res: any) => {
      try {
        const { deviceId } = req.query;
  
        if (!deviceId) {
          return res.status(400).json({ message: 'Device ID is required.' });
        }
  
        const cartItems = await cartRepository.find({
          where: { deviceId },
          relations: ['product'],
        });
  
        if (cartItems.length === 0) {
          return res.status(404).json({ message: 'No items found in the cart for this device.' });
        }
  
        return res.status(200).json({
          message: 'Cart items retrieved successfully.',
          cart: cartItems,
        });
      } catch (error) {
        console.error('Error retrieving cart items:', error);
        return res.status(500).json({ message: 'Failed to retrieve cart items.' });
      }
    },
  
    // Thêm sản phẩm vào cart
    pushCart: async (req: any, res: any) => {
      try {
        const { deviceId, productId, quantity } = req.body;
  
        if (!deviceId || !productId || !quantity) {
          return res.status(400).json({ message: 'Device ID, Product ID, and quantity are required.' });
        }
  
        const productRepository = AppDataSource.getRepository(Product);
        const product = await productRepository.findOneBy({ id: productId });
  
        if (!product) {
          return res.status(404).json({ message: 'Product not found.' });
        }
  
        if (product.quantity < quantity) {
          return res.status(400).json({ message: 'Not enough stock for this product.' });
        }
  
        const existingCart = await cartRepository.findOne({
          where: { deviceId: deviceId, product: { id: productId } },
          relations: ['product'],
        });
  
        if (existingCart) {
          existingCart.quantity += quantity;
  
          if (product.quantity < existingCart.quantity) {
            return res.status(400).json({ message: 'Not enough stock for this product after update.' });
          }
  
          const updatedCart = await cartRepository.save(existingCart);
          return res.status(200).json({
            message: 'Cart updated successfully.',
            cart: updatedCart,
          });
        } else {
          const newCart = cartRepository.create({
            date: new Date(),
            quantity: quantity,
            deviceId: deviceId,
            product: product,
          });
  
          const savedCart = await cartRepository.save(newCart);
          return res.status(201).json({
            message: 'Product added to cart successfully.',
            cart: savedCart,
          });
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
        return res.status(500).json({ message: 'Failed to add to cart.' });
      }
    },
  
    // Hàm tăng số lượng sản phẩm trong giỏ hàng
    increaseQuantity: async (req: any, res: any) => {
      try {
        const { deviceId, productId } = req.body;
  
        if (!deviceId || !productId) {
          return res.status(400).json({ message: 'Device ID and Product ID are required.' });
        }
  
        const existingCart = await cartRepository.findOne({
          where: { deviceId: deviceId, product: { id: productId } },
          relations: ['product'],
        });
  
        if (!existingCart) {
          return res.status(404).json({ message: 'Item not found in cart.' });
        }
  
        // Kiểm tra số lượng có vượt quá 99 không
        if (existingCart.quantity < 99) {
          existingCart.quantity += 1; // Tăng lên 1
          const updatedCart = await cartRepository.save(existingCart);
          return res.status(200).json({
            message: 'Cart updated successfully.',
            cart: updatedCart,
          });
        } else {
          return res.status(400).json({ message: 'Cannot increase quantity beyond 99.' });
        }
      } catch (error) {
        console.error('Error increasing quantity:', error);
        return res.status(500).json({ message: 'Failed to increase quantity.' });
      }
    },
  
    // Hàm giảm số lượng sản phẩm trong giỏ hàng
    decreaseQuantity: async (req: any, res: any) => {
      try {
        const { deviceId, productId } = req.body;
  
        if (!deviceId || !productId) {
          return res.status(400).json({ message: 'Device ID and Product ID are required.' });
        }
  
        const existingCart = await cartRepository.findOne({
          where: { deviceId: deviceId, product: { id: productId } },
          relations: ['product'],
        });
  
        if (!existingCart) {
          return res.status(404).json({ message: 'Item not found in cart.' });
        }
  
        // Kiểm tra số lượng có giảm xuống dưới 1 không
        if (existingCart.quantity > 1) {
          existingCart.quantity -= 1; // Giảm xuống 1
          const updatedCart = await cartRepository.save(existingCart);
          return res.status(200).json({
            message: 'Cart updated successfully.',
            cart: updatedCart,
          });
        } else {
          return res.status(400).json({ message: 'Cannot decrease quantity below 1.' });
        }
      } catch (error) {
        console.error('Error decreasing quantity:', error);
        return res.status(500).json({ message: 'Failed to decrease quantity.' });
      }
    },
  };
  
  module.exports = CartController;
  


module.exports = CartController