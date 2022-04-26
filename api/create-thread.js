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
      window.location.hostname
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
    const reqBody = JSON.parse(request.body);
    console.log(reqBody);
    if (reqBody.uid && reqBody.domain && reqBody.permissions){
      const queryResponse = await connection.query('INSERT INTO threads (uid, domain, permissions) VALUES (?,?,?)', [reqBody.uid, reqBody.domain, reqBody.permissions]);
      response.status(200).json(queryResponse);
    } else {
      response.status(400).send("invalid request parameters")
    }
    
}