// import { Order } from "../entities/order/Order.entities";

// let AppDataSource = require('../database');
// const orderRepository = AppDataSource.getRepository(Order);

// const OrderController = {
//     getAll: async (req: any, res: any) => {

//         const { userId } = req.query;
//         const orderBuilder = await orderRepository.createQueryBuilder('order')
//         .leftJoinAndSelect('order.orderDetails', 'orderDetails')
//         .leftJoinAndSelect('orderDetails.product', 'product')
//         .leftJoinAndSelect('order.user', 'user')
//         .where('order.userId = :id', { id: userId})
//         .getMany();
        
//         return res.status(200).json(orderBuilder)
//     },
// }


// module.exports = OrderController