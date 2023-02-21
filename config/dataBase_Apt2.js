import { Sequelize } from "sequelize";
import dotenv from "dotenv";
const env = dotenv.config().parsed;

const username = process.env.USER_APT2;
const password = process.env.PASSWORD_APT2;
const database = process.env.DATABASE_APT2;
const host = process.env.DB_HOST_APT2;
const dialect = process.env.DB_CONNECTION_APT2;
const port = process.env.DB_PORT_EXPOSE_APT2;

const db2 = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
  port: port,
});

export default db2;
