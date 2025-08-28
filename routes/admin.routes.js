import express from "express";
import { ensureAuthenticated,restrictToRole } from "../middleware/auth.middleware.js";
import { getUsers } from "../Controllers/admin.controllers.js";

const router = express.Router();

const adminRestricted=restrictToRole('ADMIN');



router.get("/users", ensureAuthenticated,adminRestricted,getUsers);

export default router;
