import dotenv from "dotenv";

dotenv.config();

interface JWTConfig {
  SECRET_KEY: string;
  EXPIRES_IN: string | number;
}
const jwtConfig: JWTConfig = {
  SECRET_KEY: process.env.SECRET_KEY,
  EXPIRES_IN: process.env.EXPIRES_IN,
};

export default jwtConfig;
