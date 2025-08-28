import { usersTable } from "../db/schema.js";
import db from "../db/index.js"

export const getUsers=async function (req, res)  {
    const users=await db.select({
        id:usersTable.id,
        name:usersTable.name,
        email:usersTable.email,
    }).from(usersTable);
    return res.json({users})
}