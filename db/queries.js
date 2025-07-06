const pool = require("./pool");
const bcrypt = require("bcryptjs");

async function getAllMessages() {
  const { rows } = await pool.query(
    `SELECT messages.id, messages.text, messages.time_added, users.username
     FROM messages
     JOIN users ON messages.user_id = users.id
     ORDER BY messages.time_added DESC`
  );
  return rows;
}

async function postMessage(text, userId) {
  await pool.query("INSERT INTO messages (text, user_id) VALUES ($1, $2)", [
    text,
    userId,
  ]);
}

async function getMessageWithId(id) {
  const { rows } = await pool.query(
    `SELECT messages.id, messages.text, messages.time_added, users.username
     FROM messages
     JOIN users ON messages.user_id = users.id
     WHERE messages.id = $1`,
    [id]
  );
  return rows;
}

async function deleteWithId(id) {
  await pool.query(`DELETE FROM messages WHERE id=${id.toString()}`);
}

async function updateWithId(text, id, userId) {
  await pool.query(
    `UPDATE messages SET text = $1 WHERE user_id = $2 AND id = $3`,
    [text, userId, id]
  );
}
async function signUpDB(username, password) {
  const hashedPssword = await bcrypt.hash(password, 10);

  await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
    username,
    hashedPssword,
  ]);
}

async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id= $1", [id]);
  return rows;
}

async function deleteUserByID(id) {
  // Delete messages first to maintain referential integrity
  await pool.query("DELETE FROM messages WHERE user_id = $1", [id]);

  // Then delete the user
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
}

module.exports = {
  getAllMessages,
  postMessage,
  getMessageWithId,
  deleteWithId,
  updateWithId,
  signUpDB,
  getUserById,
  deleteUserByID,
};
