// addUser.js
import { v4 as uuidv4 } from 'uuid';
import { connection } from "./_dbConnection.js";


export default async function handler(req, res) {
  // this is making wide sweeping assumptions of the data accuracy
  // eslint-disable-next-line camelcase
  const {is_admin, name} = JSON.parse(req.body);
  const uid = uuidv4();
  const newUser = {"is_admin": is_admin, "name": name, "uid": uid};

  await connection.query('INSERT INTO users (uid, name, is_admin) VALUES (?,?,?)', [newUser.uid, newUser.name, newUser.is_admin]);
  res.json(newUser);
}