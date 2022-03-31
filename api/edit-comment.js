import * as mysql from 'mysql2/promise'

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
  
  const reqBody = req.body;
  const connection = await mysql.createConnection({
    host: process.env.PLANETSCALE_DB_HOST,
    user: process.env.PLANETSCALE_DB_USERNAME,
    password: process.env.PLANETSCALE_DB_PASSWORD,
    port: 3306,
    database: process.env.PLANETSCALE_DB,
    ssl: {}
  });

  const editedComment = {
    uid: reqBody.uid,
    body: reqBody.body
  }
  const editTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
  editedComment.is_edited = true;
  editedComment.edited_time = editTime;
  await connection.query('UPDATE comments SET body = ?, is_edited = ?, edited_time = ? WHERE uid = ?', [editedComment.body, editedComment.is_edited, editedComment.edited_time, editedComment.uid]);

  const [rows] = await connection.query('SELECT * FROM comments WHERE uid = ?', [editedComment.uid]);
  const returnedComment = rows[0];
  res.json(returnedComment)

}