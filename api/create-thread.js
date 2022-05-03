import pkg from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { connection } from "./_dbConnection.js";

/**
 * 
 * @param {Object} request 
 * @param {Object} response 
 */
export default async function handler(request, response) {
    // the thread ID should be set as the hash of the page URL
    /*  UID
      const currentPage = window.location.href;
      const hashBits = sjcl.hash.sha256.hash(currentPage);
      return sjcl.codec.hex.fromBits(hashBits);

        DOMAIN
      window.location.hostname - should be equivalent to the "referer" value of HTTP Request
    /*
    // the response should include permissions for the thread as chmod (AGE:admin,group,everyone)
    /*
        0: (000) No permission.
        1: (001) Execute permission.
        2: (010) Write permission.
        3: (011) Write and execute permissions.
        4: (100) Read permission.
        5: (101) Read and execute permissions.
        6: (110) Read and write permissions.
        7: (111) Read, write, and execute permissions.
    */

    console.log(`Create Thread Ran: ${request.body}`)
    if (request.headers.authorization == null) { response.status(401).send("Authentication Required"); }
    else {
      const authSecret = process.env.AUTH_ACCESS_TOKEN_SECRET;
      const authHeader = request.headers.authorization;
      const userToken = authHeader && authHeader.split(' ')[1]
      let originUser = null;
      
      pkg.verify(userToken, authSecret, (err, user) => {
        if (err) {
          response.status(403).send("Authentication Failure");
          console.log(err);
        }
        originUser = user;
      });

      if (!originUser.isAdmin) response.status(403).send("Action denied")

      const reqBody = JSON.parse(request.body);
      console.log(reqBody);

      console.log(reqBody.domain)
      console.log(reqBody.permissions)

      if (reqBody.domain && reqBody.permissions){
        const threadUid = uuidv4();
        const queryResponse = await connection.query('INSERT INTO threads (uid, domain, permissions) VALUES (?,?,?)', [threadUid, reqBody.domain, reqBody.permissions]);
        reqBody.uid = threadUid;
        response.status(200).json(reqBody);
      } else {
        response.status(400).send("invalid request parameters")
      }
    }
}