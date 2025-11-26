import AppDataSource from "../dataSource";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRepo = AppDataSource.getRepository(User);

export const register = async (data: any) => {
  const { name, surname, email, password } = data;

  // Only check users that are not soft deleted
  const existing = await userRepo.findOne({
    where: { email },
    withDeleted: false,
  });

  if (existing) throw new Error("Email already in use");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = userRepo.create({
    name,
    surname,
    email,
    password: hashedPassword,
  });

  await userRepo.save(user);

  return { message: "User registered successfully" };
};

export const login = async (data: any) => {
  const { email, password } = data;

  const user = await userRepo.findOne({
    where: { email },
    select: ["id", "email", "password", "name", "surname"],
  });

  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  return { token };
};

export const deleteAccount = async (userId: number) => {
  const user = await userRepo.findOne({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  await userRepo.softDelete(userId);

  return { message: "Account has been deleted (Soft Delete)" };
};
