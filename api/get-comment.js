import { connection } from "./dbConnection.js";

export default async function handler(req, res) {
  console.log(`Get Comment Endpoint: ${req}`)

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");

  const commentID = req.query.uid;
  console.log(`Comment ID: ${commentID}`);
  // If there is a uid present that means we want a specific comment
  if (commentID === undefined){
    const [rows] = await connection.query('SELECT * FROM comments');
    console.log(rows);
    res.json(rows);
  } 
  const [rows] = await connection.query('SELECT * FROM comments WHERE uid = ?', commentID);
    console.log(rows[0]);
    res.json(rows[0]);
}