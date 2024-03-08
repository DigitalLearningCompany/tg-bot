// Function to select a user by their Telegram ID
const sqlite3 = require("sqlite3").verbose();

function updateUserStatus(
  telegramId,
  newStatus,
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
          // Define SQL query to update user status by Telegram ID
          const updateStatusQuery = `
              UPDATE users
              SET status = ?
              SET last_message_sent = ?
              SET last_message_sent_at = ?
              WHERE telegram_id = ?
            `;

          // Execute the SQL query to update the user status
          db.run(
            updateStatusQuery,
            [newStatus, last_message_sent, last_message_sent_at, telegramId],
            function (err) {
              if (err) {
                reject(err);
              } else {
                console.log("User status updated successfully.");
                resolve(true);
              }
            }
          );
        }
      }
    );
  });
}

module.exports = updateUserStatus;
