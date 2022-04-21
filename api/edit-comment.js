import { connection } from "./_dbConnection.js";

export default async function handler(req, res) {
  console.log(`Edit Comment Ran: ${req.body}`)
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
  
  const reqBody = JSON.parse(req.body);

  const editedComment = {
    uid: reqBody.uid,
    body: reqBody.body
  }
  // @feedback why are you editing this instead of storing this timestamp?
  // the frontend should be able to convert this into a usable date, storage should be pure
  const editTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
  editedComment.is_edited = true;
  editedComment.edited_time = editTime;
  await connection.query('UPDATE comments SET body = ?, is_edited = ?, edited_time = ? WHERE uid = ?', [editedComment.body, editedComment.is_edited, editedComment.edited_time, editedComment.uid]);

  const [rows] = await connection.query('SELECT * FROM comments WHERE uid = ?', [editedComment.uid]);
  const returnedComment = rows[0];
  res.json(returnedComment);

}