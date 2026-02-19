import express, { type Request, type Response } from "express";
import { Router } from "express";
import { login, signup, verify } from "../controllers/authController.js";

const router = Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/verify', verify)

export default router;