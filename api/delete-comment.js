import pkg from 'jsonwebtoken';
import { connection } from "./_dbConnection.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
  
  console.log("Delete Comment Ran")

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

    const commentUid = req.query.uid;
    if (!commentUid) res.status(400).send("Comment ID not supplied")
    const [rowsBeforeEdit] = await connection.query('SELECT * FROM comments WHERE uid = ?', [commentUid]);
    if (rowsBeforeEdit.length === 0) {res.status(404).send("Error: comment not found")}
    else if (rowsBeforeEdit[0].user_uid !== originUser.uid && !originUser.isAdmin) res.status(403).send("Action Prohibited");

    await connection.query('UPDATE comments SET is_deleted = ? WHERE uid = ?', [true, commentUid]);
    res.status(200).send();
  }
}