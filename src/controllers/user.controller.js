import {userService} from '../services/user.service.js';

const getUser = async (req, res) => {
  res.json({
    message: "User founded successfully",
    user: await userService.getUser(req),
  });
};

export const userController = {
  "getUser": getUser,
};
