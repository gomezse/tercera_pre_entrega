import {userService} from '../services/user.service.js';

const getUser = async (req, res) => {
  res.json({
    message: "User founded successfully",
    user: await userService.getUser(req),
  });
};

const create =async (req, res) => {
  const user = req.body;
  const createdUser = await userService.create(user);
  res.json({ createdUser });
}

export const userController = {
  "getUser": getUser,
  "create":create
};
