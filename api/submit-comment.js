import { PSDB } from 'planetscale-node';
import { v4 as uuidv4 } from 'uuid';

const conn = new PSDB('main');

export default async function handler(req, res) {
  const reqBody = req.body;
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=300');
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
  const commentUUID = uuidv4();
  reqBody.uid = commentUUID;
  reqBody.submitted_time = new Date().toISOString()
  res.json(await JSON.stringify(reqBody));
  conn.query('INSERT INTO comments(uid, thread_uid, submitted_time, body) VALUES ?', [[reqBody.uid, reqBody.thread_uid, reqBody.submitted_time, reqBody.body]], (err) => {
    if (err) console.log("AHHHHHHHHHHHHHHHHHHHHH")
    else console.log("Yay!")
  });
}