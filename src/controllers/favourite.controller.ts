import { Favourite } from "../entities/favourite/favourite.entities";
import { Product } from "../entities/product/Product.entities";

let AppDataSource = require('../database');
const favouriteRepository = AppDataSource.getRepository(Favourite);
const productRepository = AppDataSource.getRepository(Product);

const FavouriteController = {
    // Thêm vào yêu thích
    pushFavou: async (req: any, res: any) => {
        try {
            const { deviceId, productId } = req.body;

            // Kiểm tra thông tin truyền vào
            if (!deviceId || !productId) {
                return res.status(400).json({ message: 'Device ID and Product ID are required.' });
            }

            // Kiểm tra xem sản phẩm có tồn tại không
            const product = await productRepository.findOneBy({ id: productId });
            if (!product) {
                return res.status(404).json({ message: 'Sản phẩm không tồn tại.' });
            }

            // Kiểm tra xem sản phẩm đã có trong danh sách yêu thích chưa
            const existingFav = await favouriteRepository.findOne({
                where: { deviceId, product },
            });

            if (existingFav) {
                return res.status(204).json({ message: 'Sản phẩm đã có trong danh sách yêu thích.' });
            }

            // Thêm sản phẩm vào danh sách yêu thích
            const newFavourite = favouriteRepository.create({
                deviceId,
                product,
            });

            await favouriteRepository.save(newFavourite);

            return res.status(201).json({ message: 'Đã thêm vào yêu thích.', favourite: newFavourite });
        } catch (error) {
            console.error('Error adding to favourites:', error);
            return res.status(500).json({ message: 'Đã có lỗi xảy ra trong quá trình thêm vào yêu thích.'});
        }
    },

    // Xóa sản phẩm khỏi yêu thích
    removeFavou: async (req: any, res: any) => {
        try {
            const { deviceId, productId } = req.body;

            // Kiểm tra thông tin truyền vào
            if (!deviceId || !productId) {
                return res.status(400).json({ message: 'Device ID and Product ID are required.' });
            }

            // Kiểm tra xem sản phẩm có tồn tại không
            const product = await productRepository.findOneBy({ id: productId });
            if (!product) {
                return res.status(404).json({ message: 'Sản phẩm không tồn tại.' });
            }

            // Tìm sản phẩm trong danh sách yêu thích của deviceId
            const favItem = await favouriteRepository.findOne({
                where: { deviceId, product },
            });

            // Kiểm tra nếu không có sản phẩm trong danh sách yêu thích
            if (!favItem) {
                return res.status(404).json({ message: 'Sản phẩm không có trong danh sách yêu thích.' });
            }

            // Xóa sản phẩm khỏi danh sách yêu thích
            await favouriteRepository.remove(favItem);

            return res.status(200).json({ message: 'Sản phẩm đã được xóa khỏi yêu thích.' });
        } catch (error) {
            console.error('Error removing from favourites:', error);
            return res.status(500).json({ message: 'Đã có lỗi xảy ra trong quá trình xóa khỏi yêu thích.' });
        }
    },

    // Lấy danh sách yêu thích
    getListFavou: async (req: any, res: any) => {
        try {
            const { deviceId, productId } = req.query;

            // Kiểm tra thông tin truyền vào
            if (!deviceId) {
                return res.status(400).json({ message: 'Device ID is required.' });
            }

            // Nếu chỉ cần lấy danh sách yêu thích của deviceId
            if (!productId) {
                const favouriteItems = await favouriteRepository.find({
                    where: { deviceId },
                    relations: ['product'], // Kết nối với sản phẩm
                });

                if (favouriteItems.length === 0) {
                    return res.status(200).json({ message: 'Không có sản phẩm yêu thích nào.', favourites: [] });
                }

                return res.status(200).json({ message: 'Danh sách yêu thích', favourites: favouriteItems });
            }

            // Nếu cần lọc theo cả deviceId và productId
            const favouriteItem = await favouriteRepository.findOne({
                where: { deviceId, product: { id: productId } },
                relations: ['product'],
            });

            if (!favouriteItem) {
                return res.status(404).json({ message: 'Sản phẩm này không có trong danh sách yêu thích của thiết bị.' });
            }

            return res.status(200).json({ message: 'Danh sách yêu thích', favourite: favouriteItem });
        } catch (error) {
            console.error('Error retrieving favourites:', error);
            return res.status(500).json({ message: 'Đã có lỗi xảy ra trong quá trình lấy danh sách yêu thích.' });
        }
    },

    // Kiểm tra xem sản phẩm có trong danh sách yêu thích của deviceId hay không
getFavouStatus: async (req: any, res: any) => {
    try {
        const { deviceId, productId } = req.query;

        // Kiểm tra thông tin truyền vào
        if (!deviceId || !productId) {
            return res.status(400).json({ message: 'Device ID and Product ID are required.' });
        }

        // Kiểm tra xem sản phẩm có tồn tại không
        const product = await productRepository.findOneBy({ id: productId });
        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại.' });
        }

        // Kiểm tra xem sản phẩm đã có trong danh sách yêu thích chưa
        const existingFav = await favouriteRepository.findOne({
            where: { deviceId, product },
        });

        if (existingFav) {
            return res.status(200).json({ message: 'Sản phẩm đã có trong danh sách yêu thích.', exists: true });
        } else {
            return res.status(200).json({ message: 'Sản phẩm chưa có trong danh sách yêu thích.', exists: false });
        }

    } catch (error) {
        console.error('Error checking favourite status:', error);
        return res.status(500).json({ message: 'Đã có lỗi xảy ra trong quá trình kiểm tra yêu thích.' });
    }
},

};

module.exports = FavouriteController;
