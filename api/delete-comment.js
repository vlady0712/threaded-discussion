import { connection } from "./_dbConnection.js";

export default async function handler(req, res) {
  console.log("Delete Comment Ran")
  const reqID = req.query.uid;
  const response = await connection.query('UPDATE comments SET is_deleted = ? WHERE uid = ?', [true, reqID]);
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=300');
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
  res.json(response);
}