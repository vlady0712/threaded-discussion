import * as mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const reqID = req.query.uid;
  const connection = await mysql.createConnection({
    host: process.env.PLANETSCALE_DB_HOST,
    user: process.env.PLANETSCALE_DB_USERNAME,
    password: process.env.PLANETSCALE_DB_PASSWORD,
    port: 3306,
    database: process.env.PLANETSCALE_DB,
    ssl: {}
  });
  const response = await connection.query('UPDATE comments SET is_deleted = ? WHERE uid = ?', [true, reqID]);
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=300');
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
  res.json(await response);
}