import express from "express";
import jwt from "jsonwebtoken";
import db from "./db/index.js";
import { eq } from "drizzle-orm";
import { usersTable, userSessions } from "./db/schema.js";
import {authenticationMiddleware} from './middleware/auth.middleware.js'
import adminRouter from "./routes/admin.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT ?? 8000;

//Middlewares
app.use(express.json());
app.use(authenticationMiddleware);

// app.use(async function(req,res,next){
//    const sessionId = req.headers["session-id"];
//   if (!sessionId) {
//     return next();
//   }
//   const [data] = await db
//     .select({
//       sessionId: userSessions.id,
//       userId: userSessions.userId,
//       id:usersTable.id,
//       name:usersTable.name,
//       email:usersTable.email,
//       startTime:userSessions.createdAt
//     })
//     .from(userSessions)
//     .rightJoin(usersTable, eq(usersTable.id, userSessions.userId))
//     .where((table)=>{eq(table.id,sessionId)})

//     if(!data) return next()

//      req.user=data;
//     next();
// })

// app.get("/", (req, res) => {
//   return res.json({ status: "Okay" });
// });


app.get("/", (req, res) => {
  return res.json({ status: "Okay" });
});


app.use("/user", userRouter);
app.use('/admin',adminRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
