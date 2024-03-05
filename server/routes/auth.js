import express from "express";
import { login, signup } from "../controllers/authController";

export const authRoute = express.Router();
authRoute.post("/singup", signup);
authRoute.post("/login", login);
