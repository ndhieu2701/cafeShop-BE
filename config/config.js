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
  cloudName: process.env.CLOUD_NAME,
  cloudApiKey: process.env.CLOUD_API_KEY,
  cloudApiSecret: process.env.CLOUD_API_SECRET,
};

export default config;
