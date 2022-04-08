import { connection } from "./_dbConnection.js";

/**
 * Returns thread info: 
 * @param {Object} request 
 * @param {Object} response 
 */
export default async function handler(req, res) {
    // the thread ID should be set as the hash of the page URL
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
    const threadUid = req.query.uid;
    const [rows] = await connection.query("SELECT * from threads WHERE uid = ?", [threadUid])
    if (rows.length === 1 && rows[0]) {
        res.status(200).json(rows[0]);
    } else {
        res.status(404)
    }
    
}