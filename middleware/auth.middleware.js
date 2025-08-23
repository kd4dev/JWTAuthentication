import "dotenv/config";
import jwt from "jsonwebtoken";

export const authenticationMiddleware = async function (req, res, next) {
  try {
    const tokenHeader = req.headers["authorization"];

    //header authorisation:Bearer <token>
    if (!tokenHeader) return next();
    if (!tokenHeader.startsWith("Bearer"))
      return res
        .status(400)
        .json({ error: `authorisation must start with bearer` });

    const token = tokenHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    next();
  }
};

export const ensureAuthenticated = (req, res, next) => {
  if (!req.user)
    return res.status(401).json({ error: `You are not logged in` });

  next();
};

export const restrictToRole = function (role) {
  return function (req, res, next) {
    if (role !== req.user.role)
      return res
        .status(401)
        .json({ error: ` you role is not authorised to access this resource` });

    next();
  };
};
