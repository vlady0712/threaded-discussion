import pkg from 'jsonwebtoken';
import { connection } from "./_dbConnection.js";


// MUST SPECIFY THREAD ID AND THREAD PERMISSIONS
// Figure out how to do joins
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
  console.log(`Get Comment Endpoint: ${req}`);

  /*
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
    */

    const commentID = req.query.uid;
    const threadID = req.query.threadId;
    console.log(`Comment ID: ${commentID}`);
    console.log(`THreadID: ${threadID}`);
    // If there is a uid present that means we want a specific comment
    // TODO: check if threadID is defined, throw error otherwise
    if (commentID === undefined){
      const returnedCommentArray = [];
      // get top comments
      const topCommentQuery = await connection.query('SELECT comments.*, users.name FROM comments LEFT JOIN users ON comments.user_uid=users.uid WHERE comments.thread_uid=? AND is_reply=false AND is_deleted=false ORDER BY comments.submitted_time DESC', [threadID]);
      const topComments = topCommentQuery[0];

      // get replies
      for (const comment of topComments){
        const toBeReturned = [];
        toBeReturned.push(comment);
        const childCommentQuery = await connection.query('SELECT comments.*, users.name FROM comments LEFT JOIN users ON comments.user_uid=users.uid WHERE comments.uid=? AND is_reply=true AND is_deleted=false ORDER BY comments.submitted_time DESC;', [comment.uid]);
        const childComments = childCommentQuery[0];
        if (childComments.length > 0){
          toBeReturned.concat(childComments);
        }
        returnedCommentArray.push(toBeReturned);
      }

      res.status(200).json(returnedCommentArray);
    } 
    const [rows] = await connection.query('SELECT * FROM comments WHERE uid = ?', commentID);
      // console.log(rows[0]);
      res.status(200).json(rows[0]);
  // }
}