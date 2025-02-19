import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const verifiedUser = jwt.verify(token, process.env.VITE_JWT_SECRET_KEY);

    req.user = verifiedUser;
    next();
  } catch (error) {
    res.status(403).json({ message: "Token expired or invalid" });
  }
};

export { authenticateToken };
