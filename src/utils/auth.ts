import jwt from "jsonwebtoken";

const generateToken = (employe_id: string) => {
  const jwtSecret = process.env.JWT_SECRET || "secret";
  const payload = {
    employe_id,
    token: "asdfrewq",
  };

  const token = jwt.sign(payload, jwtSecret, { expiresIn: "10d" });

  return token;
};

const generateRefreshToken = (employe_id: string) => {
  const jwtSecret = process.env.JWT_REFRESH_SECRET || "refresh";
  const payload = {
    employe_id,
    token: "asdfrewq",
  };

  const token = jwt.sign(payload, jwtSecret, { expiresIn: "30d" });

  return token;
};

export { generateToken, generateRefreshToken };
