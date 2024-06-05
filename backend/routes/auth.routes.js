import express from "express";
import { login, signup } from "../controller/auth.controller.js";
const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(signup);

export default router;
