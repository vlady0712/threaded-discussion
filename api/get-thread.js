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
        2: (010) Write permission.
        4: (100) Read permission.
        7: (111) Read and write permissions.

        Access Patterns (Initial Load):

        700: no permissions unless admin
        740: read for group only
        744: read for all
        770: r/w for group only
        774: r/w for group, read for all
        777: r/w for all
    */
    const threadUid = req.query.uid;
    const [rows] = await connection.query("SELECT * from threads WHERE uid = ?", [threadUid])
    if (rows.length === 1 && rows[0]) {
        res.status(200).json(rows[0]);
    } else {
        res.status(404)
    }
    
}