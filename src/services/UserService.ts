import { PrismaClient } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { hashPassword, comparePassword } from "../utils/hash.utils";

const prisma = new PrismaClient();

export async function registerUser(email: string, password: string) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("Email already taken");

  const hashed = hashPassword(password);
  const user = await prisma.user.create({
    data: { email, password: hashed },
  });

  return { id: user.id, email: user.email };
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid email or password");

  const match = comparePassword(password, user.password);
  if (!match) throw new Error("Invalid email or password");

  const token = sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  return { token };
}