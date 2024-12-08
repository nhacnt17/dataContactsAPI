// import { User } from "../entities/user/User.entities";

// let AppDataSource = require('../database');
// const userRepository = AppDataSource.getRepository(User);



// const UserController = {
//     getAll: async (req: any, res: any) => {

        
//         const data = await userRepository.find();

//         return res.status(200).json(data)
//     },
//     delete: async (req: any, res: any) => {

//         const { id } = req.params;

//         const user = await userRepository.findOne({ where: { id } });

//         if (user) {
//             await userRepository.remove(user);
//         } else {
//             return res.status(404).json("User not found.");
//         }

//         return res.status(200).json("Deleted user successful !")
//     }

// }


// module.exports = UserController