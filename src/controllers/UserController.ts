import { Request, Response } from "express";
import * as UserService from "../services/UserService";

//Function register di controller
export async function register(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const result = await UserService.registerUser(email, password);
    res.status(201).json({ success: true, data: result }); //Kalau register berhasil, status 201
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message }); // Kalau register gagal, status 400 dan tampilin errornya di console
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const result = await UserService.loginUser(email, password);
    res.json({ success: true, token: result.token }); //Kalau login berhasil
  } catch (err: any) {
    res.status(401).json({ success: false, message: err.message });  // Kalau login gagal, status 401 dan tampilin errornya di console
  }
}