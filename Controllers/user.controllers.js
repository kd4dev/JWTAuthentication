import db from "../db/index.js";
import jwt from 'jsonwebtoken';
import { randomBytes, createHmac } from "node:crypto";
import { eq } from "drizzle-orm";
import { usersTable, userSessions } from "../db/schema.js";

export const updateName=async function (req, res) {
  const{name}=req.body;
  await db.update(usersTable).set({name}).where(eq(usersTable.id,user.id));

    return  res.json({ status:`success`}); 
}

export const  logCheck=async function (req, res)  {
  //returns if user is logged in  or not
  return res.json({ user });
}

export const signUp= async function(req, res)  {
  const { name, email, password } = req.body;

  const [existingUser] = await db
    .select({
      email: usersTable.email,
    }) //ye bas email select karega naki pura data agar condition match hui toh
    .from(usersTable)
    .where((table) => eq(table.email, email));
  console.log(existingUser);
  if (existingUser) {
    return res.status(400).json({ error: "user with email already exist" });
  }

  const salt = randomBytes(256).toString("hex");
  const hashPassword = createHmac("sha256", salt).update(password).digest("hex");

  const [user] = await db
    .insert(usersTable)
    .values({
      name,
      email,
      password: hashPassword,
      salt,
    })
    .returning({ id: usersTable.id });

  return res.status(201).json({
    status: "success",
    data: { userId: user.id },
  });
}

export const logIn=async function (req, res)  {
  const { email, password } = req.body;
  const [existingUser] = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      salt: usersTable.salt,
      role:usersTable.role,
      password: usersTable.password,
    })
    .from(usersTable)
    .where((table) => eq(table.email, email));

  if (!existingUser)
    return res
      .status(404)
      .json({ error: `User with email:${email} does not exist` });

  const salt = existingUser.salt;
  const hashPassword = existingUser.password; //this is existing password stored as hash in db
  const newHash = createHmac("sha256", salt).update(password).digest("hex"); //this our hash that we created form password given by user and salt we have in db

  if (newHash !== hashPassword)
    return res.status(400).json({ error: `Incorrect Password!` });

  //generate a session-->
//   const [session] = await db
//     .insert(userSessions)
//     .values({
//       userId: existingUser.id, 
//     })
//     .returning({ id: userSessions.id });
//   return res.json({ status: `Success!`, sessionId: `${session.id}` });

//generate token-->

  const  payload={
    id:existingUser.id,
    email:existingUser.email,
    role:existingUser.role,
    name:existingUser.name
  }
  const token=jwt.sign(payload,process.env.JWT_SECRET)

   return res.json({ status: `Success!`, token});

}