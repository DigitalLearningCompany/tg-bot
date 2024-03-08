const sqlite3 = require("sqlite3").verbose();

// Function to insert a new user into the users table
function insertUser(
  telegramId,
  name,
  status = "pending",
  last_message_sent,
  last_message_sent_at
) {
  return new Promise((resolve, reject) => {
    // Open a connection to the SQLite database
    const db = new sqlite3.Database(
      "../database.db",
      sqlite3.OPEN_READWRITE,
      (err) => {
        if (err) {
          reject(err);
        } else {
          // Define SQL query to insert a new user
          const insertUserQuery = `
            INSERT INTO users (telegram_id, name, status, last_message_sent, last_message_sent_at) VALUES (?, ?, ?, ?, ?)
          `;

          // Execute the SQL query to insert the user

          db.run(
            insertUserQuery,
            [telegramId, name, status, last_message_sent, last_message_sent_at],
            function (err) {
              if (err) {
                reject(err);
              } else {
                console.log("User inserted successfully.");
                resolve({ name, telegramId, status });
              }
            }
          );
        }
      }
    );
  });
}

module.exports = insertUser;
