import dotenv from "dotenv";

dotenv.config();

const config = {
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  mailHost: process.env.GMAIL_HOST,
  mailPort: process.env.GMAIL_PORT,
  mailAccount: process.env.GMAIL_ACCOUNT,
  mailPass: process.env.GMAIL_PASSWORD,
};

export default config;
