import { Product } from "../entities/product/Product.entities";

let AppDataSource = require('../database');
const productRepository = AppDataSource.getRepository(Product);

const ProductController = {
    getAll: async (req: any, res: any) => {
        // Lấy toàn bộ dữ liệu từ bảng Product
        const productBuilder = await productRepository.find();
        // console.log(productBuilder)
        // Trả dữ liệu về client
        return res.status(200).json(productBuilder);
    },
}

module.exports = ProductController