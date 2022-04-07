import pkg from 'jsonwebtoken';
import * as mysql from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';

/**
 * @param {*} req 
 * @param {*} res 
 * 
 * Generating crypto keys:
 * require('crypto').randomBytes(64).toString('hex')
 */
export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8008");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization");
    if (req.method === 'OPTIONS'){
        res.status(200).json();
    }
    const accessTokenSecret = process.env.AUTH_ACCESS_TOKEN_SECRET;
    const refreshTokenSecret = process.env.AUTH_REFRESH_TOKEN_SECRET;
    const connection = await mysql.createConnection({
        host: process.env.PLANETSCALE_DB_HOST,
        user: process.env.PLANETSCALE_DB_USERNAME,
        password: process.env.PLANETSCALE_DB_PASSWORD,
        port: 3306,
        database: process.env.PLANETSCALE_DB,
        ssl: {}
    });
    const username = req.body.username;
    const user = {
        username: username,
    };
    const [rows] = await connection.query('SELECT * FROM users WHERE name = ?', [username]);
 
    if (rows.length === 1){
        user.uid = rows[0].uid;
        user.isAdmin = rows[0].is_admin;
    } else if (rows.length === 0){
        user.uid = uuidv4();
        user.isAdmin = false;
        await connection.query('INSERT INTO users (uid, name, is_admin) VALUES (?,?,?)', [user.uid, user.username, user.isAdmin]);
    } else {
        // return some error
    }
    
    const accessToken = pkg.sign(user, accessTokenSecret);
    res.json({accessToken: accessToken});
}