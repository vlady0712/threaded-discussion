import pkg from 'jsonwebtoken';
import { connection } from "./_dbConnection.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
  
  console.log(`Edit Comment Ran: ${req.body}`)
  if (req.headers.authorization == null) { res.status(401).send("Authentication Required"); }
  else {
    const authSecret = process.env.AUTH_ACCESS_TOKEN_SECRET;
    const authHeader = req.headers.authorization;
    const userToken = authHeader && authHeader.split(' ')[1]
    let originUser = null;
    console.log(userToken);
    console.log(authSecret);
    
    pkg.verify(userToken, authSecret, (err, user) => {
      if (err) {
        res.status(403).send("Authentication Failure");
        console.log(err);
      }
      originUser = user;
    });

    console.log(originUser);

    console.log(req.body);
    const reqBody = req.body;
    const [rows] = await connection.query('SELECT * FROM comments WHERE uid = ?', [editedComment.uid]);
    const returnedComment = rows[0];
    res.json(returnedComment);

    const editedComment = {
      uid: reqBody.uid,
      body: reqBody.body
    }

    const [rowsBeforeEdit] = await connection.query('SELECT * FROM comments WHERE uid = ?', [editedComment.uid]);
    console.log(rowsBeforeEdit)
    if (rowsBeforeEdit[0].user_uid !== originUser.uid && !originUser.isAdmin) res.status(403).send("Action Prohibited");
    // @feedback why are you editing this instead of storing this timestamp?
    // the frontend should be able to convert this into a usable date, storage should be pure
    const editTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    editedComment.is_edited = true;
    editedComment.edited_time = editTime;
    await connection.query('UPDATE comments SET body = ?, is_edited = ?, edited_time = ? WHERE uid = ?', [editedComment.body, editedComment.is_edited, editedComment.edited_time, editedComment.uid]);

    const [rowsAfterEdit] = await connection.query('SELECT * FROM comments WHERE uid = ?', [editedComment.uid]);
    const returnedComment = rowsAfterEdit[0];
    res.status(200).json(returnedComment)
  }
}