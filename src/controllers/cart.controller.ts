import { Cart } from "../entities/cart/cart.entities";

let AppDataSource = require('../database');
const cartRepository = AppDataSource.getRepository(Cart);

const CartController = {
  getList: async (req: any, res: any) => {
    const { deviceId } = req.query;
    
    if (!deviceId) {
      return res.status(400).json({ message: 'Device ID is required.' });
    }

    const cartItems = await cartRepository.find({
      where: { deviceId },
      relations: ['product'],
    });

    return res.status(200).json({
      message: 'Cart items retrieved successfully.',
      cart: cartItems.length ? cartItems : [],
    });
  },

  pushCart: async (req: any, res: any) => {
    try {
      const { deviceId, productId, quantity } = req.body;
  
      if (!deviceId || !productId || quantity == null) {
        return res.status(400).json({ message: 'Device ID, Product ID, and quantity are required.' });
      }
  
      const productRepo = AppDataSource.getRepository('Product');
      const product = await productRepo.findOneBy({ id: productId });
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
      }
  
      let cartItem = await cartRepository.findOne({
        where: { deviceId, product: { id: productId } },
        relations: ['product'],
      });
  
      if (cartItem) {
        if (quantity === 0) {
          await cartRepository.remove(cartItem);
          return res.status(200).json({ message: 'Product removed from cart.' });
        }
  
        cartItem.quantity = quantity;
      } else {
        if (quantity === 0) {
          return res.status(400).json({ message: 'Quantity must be greater than zero.' });
        }
  
        cartItem = cartRepository.create({
          date: new Date(),
          quantity,
          deviceId,
          product,
        });
      }
  
      const savedCart = await cartRepository.save(cartItem);
      return res.status(200).json({ message: 'Cart updated successfully.', cart: savedCart });
  
    } catch (error) {
      console.error('Error updating cart:', error);
      return res.status(500).json({ message: 'Failed to update cart.' });
    }
  },

  getTotalPrice: async (req: any, res: any) => {
    try {
      const { deviceId } = req.query;
  
      if (!deviceId) {
        return res.status(400).json({ message: 'Device ID is required.' });
      }
  
      // Lấy danh sách giỏ hàng của deviceId
      const cartItems = await cartRepository.find({
        where: { deviceId },
        relations: ['product'], // Lấy thông tin sản phẩm
      });
  
      if (cartItems.length === 0) {
        return res.status(200).json({ message: 'Cart is empty.', totalPrice: 0 });
      }
  
      // Tính tổng tiền (giá * số lượng)
      const totalPrice = cartItems.reduce((sum:any, item:any) => {
        return sum + item.quantity * item.product.price;
      }, 0);
  
      return res.status(200).json({
        message: 'Total price calculated successfully.',
        totalPrice,
      });
  
    } catch (error) {
      console.error('Error calculating total price:', error);
      return res.status(500).json({ message: 'Failed to calculate total price.' });
    }
  },
  
};

module.exports = CartController;
