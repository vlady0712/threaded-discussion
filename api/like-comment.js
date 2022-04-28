import pkg from 'jsonwebtoken';
import { connection } from "./_dbConnection.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");

  if (req.headers.authorization == null) res.status(401).send("Authentication Required");
  else {
    const authSecret = process.env.AUTH_ACCESS_TOKEN_SECRET;
    const authHeader = req.headers.authorization;
    const userToken = authHeader && authHeader.split(' ')[1]
    const originUser = null;
    
    pkg.verify(userToken, authSecret, (err, user) => {
      if (err) {
        res.status(403).send("Authentication Failure");
      }
      originUser = user;
    });

    const commentID = req.query.uid;
    if (!commentID) res.status(400).send("Comment ID not supplied")
    let [rows] = await connection.query(`SELECT * FROM comments WHERE uid = ?`, commentID);
    rows[0].likes += 1;
    const response = rows[0];
    [rows] = await connection.query(`UPDATE comments SET likes = ? WHERE uid = ?`, [rows[0].likes, commentID]);

    res.status(200).json(response);
  }
}