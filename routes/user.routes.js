import 'dotenv/config';
import express from "express";

import { ensureAuthenticated } from '../middleware/auth.middleware.js';
import { logIn, updateName,logCheck,signUp } from '../Controllers/user.controllers.js';

const router = express.Router();

router.patch("/", ensureAuthenticated,updateName);

router.get("/", ensureAuthenticated,logCheck);

router.post("/signup",signUp);

router.post("/login", logIn);
export default router;
