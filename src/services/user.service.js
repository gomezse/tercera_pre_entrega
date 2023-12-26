import { usersManager } from "../dao/models/mongoose/UsersManager.js";

class UserService {
  async getUser(req) {
    const { idUser } = req.params;
    try {
      const user = await usersManager.findById(idUser);      
      return user;
    } catch (error) {
      return new Error(error.message);
    }
  }
}

export const userService = new UserService();
