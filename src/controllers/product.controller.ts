import { Product } from "../entities/product/Product.entities";

let AppDataSource = require('../database');
const productRepository = AppDataSource.getRepository(Product);

const ProductController = {
    getAll: async (req: any, res: any) => {
        const { group, name } = req.query;
        const productBuilder = await productRepository.createQueryBuilder('product')

        if (group) {
            productBuilder.where('product.group = :group', { group })
        }

        if (name) {
            productBuilder.where('product.name LIKE :name', { name: `%${name}%` })
        }

        const data = await productBuilder.getMany();

        return res.status(200).json(data);
    },
    getDetail: async (req: any, res: any) => {
        const { id } = req.params;
        const productBuilder = await productRepository.findOneById(id);
        return res.status(200).json(productBuilder);
    },
}

module.exports = ProductController