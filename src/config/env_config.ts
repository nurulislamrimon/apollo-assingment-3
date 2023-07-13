import dotenv from "dotenv";

dotenv.config({ path: process.cwd() + "/.env" });

const config = {
  port: process.env.port,
  db_local: process.env.db_local,
  db_remote: process.env.db_remote,
  env: process.env.NODE_ENV,
};
export default config;
