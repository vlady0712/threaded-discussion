import pkg from 'jsonwebtoken';
import { connection } from "./_dbConnection.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
  console.log(`Like Comment Endpoint: ${req}`)
  // const reqBody = req.body;

  if (req.headers.authorization == null) res.status(401).send("Authentication Required");
  else {
    const authSecret = process.env.AUTH_ACCESS_TOKEN_SECRET;
    const authHeader = req.headers.authorization;
    const userToken = authHeader && authHeader.split(' ')[1]
    let originUser = null;
    
    pkg.verify(userToken, authSecret, (err, user) => {
      if (err) {
        res.status(403).send("Authentication Failure");
        console.log(err);
      }
      originUser = user;
    });

    const commentID = req.query.uid;
    if (!commentID) res.status(400).send("Comment ID not supplied")
    console.log(`UID: ${commentID}`);
    let [rows] = await connection.query(`SELECT * FROM comments WHERE uid = ?`, commentID);
    console.log(`Response from database to get row`)

    rows[0].likes += 1;
    const response = rows[0];
    console.log(typeof(rows[0].likes));
    console.log(rows[0].likes);
    [rows] = await connection.query(`UPDATE comments SET likes = ? WHERE uid = ?`, [rows[0].likes, commentID]);
    console.log(rows)
    
    res.status(200).json(response);
  }
}