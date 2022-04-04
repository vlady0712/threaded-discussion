import { connection } from "./dbConnection.js";

export default async function handler(req, res) {
  // const reqBody = req.body;
  const reqBody = req.query.uid;
  // console.log(`Path: ${req.originalUrl}`)
  console.log(`UID: ${reqBody}`);
  let [rows] = await connection.query(`SELECT * FROM comments WHERE uid = ?`, reqBody);
  console.log(`Response from database to get row`)

  rows[0].likes += 1;
  const response = rows[0];
  console.log(typeof(rows[0].likes));
  console.log(rows[0].likes);
  [rows] = await connection.query(`UPDATE comments SET likes = ? WHERE uid = ?`, [rows[0].likes, reqBody]);
  console.log(rows)
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=300');
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
  res.json(response);
}