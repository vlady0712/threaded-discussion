import pkg from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { connection } from "./_dbConnection.js";

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=300');
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
  console.log(`Submit Comment Ran ${req.body}`)
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

    const reqBody = req.body;

    const commentUUID = uuidv4();
    reqBody.uid = commentUUID;
    reqBody.is_reply = false;
    reqBody.submitted_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
    if (originUser && originUser.uid) { await connection.query('INSERT INTO comments (uid, thread_uid, user_uid, submitted_time, body, is_reply, reply_to ) VALUES (?,?,?,?,?,?,?)', [reqBody.uid, reqBody.thread_uid, originUser.uid, reqBody.submitted_time, reqBody.body, reqBody.is_reply, reqBody.reply_to]); }
    else { await connection.query('INSERT INTO comments (uid, thread_uid, submitted_time, body, is_reply, reply_to ) VALUES (?,?,?,?,?,?)', [reqBody.uid, reqBody.thread_uid, reqBody.submitted_time, reqBody.body, reqBody.is_reply, reqBody.reply_to]); }
    res.status(200).json(reqBody);
    await connection.end();
  }
}