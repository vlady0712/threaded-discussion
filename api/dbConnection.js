// dbConnection.js
import * as mysql from 'mysql2/promise'
export const connection = await mysql.createConnection({
  host: process.env.PLANETSCALE_DB_HOST,
  user: process.env.PLANETSCALE_DB_USERNAME,
  password: process.env.PLANETSCALE_DB_PASSWORD,
  port: 3306,
  database: process.env.PLANETSCALE_DB,
  ssl: {}
});