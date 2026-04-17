import User from "../user/user.model";
import { hashPassword, comparePassword } from "../../utils/hash";
import { generateToken } from "../../utils/jwt";

export const registerUser = async (data: any) => {
  const { name, email, password } = data;
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

 const token = generateToken(user.toObject());

  return { user, token };
};

export const loginUser = async (data: any) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user.toObject());

  return { user, token };
};