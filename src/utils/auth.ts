import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh";

const generateToken = (employe_id: string) => {
  const payload = {
    employe_id,
    token: "asdfrewq",
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "10d" });

  return token;
};

const generateRefreshToken = (employe_id: string) => {
  const payload = {
    employe_id,
    token: "asdfrewq",
  };

  const token = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "30d" });

  return token;
};

export { generateToken, generateRefreshToken };
