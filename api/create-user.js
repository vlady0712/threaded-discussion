// addUser.js
import { connection } from "./dbConnection.js";
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  console.log(`New User Endpoint: ${req.body}`)
  // this is making wide sweeping assumptions of the data accuracy
  const {is_admin, name} = JSON.parse(req.body);
  const uid = uuidv4();
  let newUser = {"is_admin": is_admin, "name": name, "uid": uid};

  await connection.query('INSERT INTO users (uid, name, is_admin) VALUES (?,?,?)', [newUser.uid, newUser.name, newUser.is_admin]);
  res.json(newUser);
}