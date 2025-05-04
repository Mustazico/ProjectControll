import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
  server: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT)
  // Add other necessary configuration options
};

export default dbConfig;

