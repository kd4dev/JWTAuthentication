import express from "express";
import { authenticationMiddleware } from "../middleware/auth.middleware.js";
import db from "../db/index.js";
import { ensureAuthenticated,restrictToRole } from "../middleware/auth.middleware.js";
import { usersTable } from "../db/schema.js";

const router = express.Router();

const adminRestricted=restrictToRole('ADMIN');



router.get("/users", ensureAuthenticated,adminRestricted,async (req, res) => {
    const users=await db.select({
        id:usersTable.id,
        name:usersTable.name,
        email:usersTable.email,
    }).from(usersTable);
    return res.json({users})
});

export default router;
