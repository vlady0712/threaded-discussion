import pkg from 'jsonwebtoken';
import { connection } from "./_dbConnection.js";


// MUST SPECIFY THREAD ID AND THREAD PERMISSIONS
// Figure out how to do joins
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
  console.log(`Get Comment Endpoint: ${req}`)
  
  if (req.headers.authorization == null) { res.status(401).send("Authentication Required"); }
  else {
    const authSecret = process.env.AUTH_ACCESS_TOKEN_SECRET;
    const authHeader = req.headers.authorization;
    const userToken = authHeader && authHeader.split(' ')[1]

    pkg.verify(userToken, authSecret, (err) => {
      if (err) {
        res.status(403).send();
        console.log(err);
      }
    });

    const commentID = req.query.uid;
    console.log(`Comment ID: ${commentID}`);
    // If there is a uid present that means we want a specific comment
    if (commentID === undefined){
      const [rows] = await connection.query('SELECT * FROM comments');
      // console.log(rows);
      res.status(200).json(rows);
    } 
    const [rows] = await connection.query('SELECT * FROM comments WHERE uid = ?', commentID);
      // console.log(rows[0]);
      res.status(200).json(rows[0]);
  }
}