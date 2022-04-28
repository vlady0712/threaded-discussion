import pkg from 'jsonwebtoken';
import { connection } from "./_dbConnection.js";

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=7');
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");

  if (req.headers.authorization == null) { res.status(401).send("Authentication Required"); }
  else {
    const authSecret = process.env.AUTH_ACCESS_TOKEN_SECRET;
    const authHeader = req.headers.authorization;
    const userToken = authHeader && authHeader.split(' ')[1]
    let originUser = null;
    
    pkg.verify(userToken, authSecret, (err, user) => {
      if (err) {
        res.status(403).send("Authentication Failure");
        
      }
      originUser = user;
    });

    const reqBody = JSON.parse(req.body);
    const editedComment = {
      uid: reqBody.uid,
      body: reqBody.body
    };

    const [rowsBeforeEdit] = await connection.query('SELECT * FROM comments WHERE uid = ?', [editedComment.uid]);
    
    if (rowsBeforeEdit[0].user_uid !== originUser.uid && !originUser.isAdmin) res.status(403).send("Action Prohibited");
    editedComment.is_edited = true;
    const initialDate = new Date();
    const timeOffsetDate = new Date(initialDate.getTime() - (initialDate.getTimezoneOffset() * 60000));
    editedComment.edited_time = timeOffsetDate.toISOString().slice(0, 19).replace('T', ' ');
    await connection.query('UPDATE comments SET body = ?, is_edited = ?, edited_time = ? WHERE uid = ?', [editedComment.body, editedComment.is_edited, editedComment.edited_time, editedComment.uid]);
    const [rowsAfterEdit] = await connection.query('SELECT * FROM comments WHERE uid = ?', [editedComment.uid]);
    const returnedComment = rowsAfterEdit[0];
    res.status(200).json(returnedComment);
  }
}