const sqlite3 = require("sqlite3").verbose();

// Function to select a user by their Telegram ID
function selectUserByTelegramId() {
  return new Promise((resolve, reject) => {
    // Open a connection to the SQLite database
    const db = new sqlite3.Database(
      "../database.db",
      sqlite3.OPEN_READWRITE,
      (err) => {
        if (err) {
          reject(err);
        } else {
          // Define SQL query to select user by Telegram ID
          const selectQuery = `
            SELECT * FROM users
          `;

          // Execute the SQL query to select the user
          db.get(selectQuery, [], function (err, row) {
            if (err) {
              reject(err);
            } else {
              if (row) {
                resolve(row);
              } else {
                resolve(null);
              }
            }
          });
        }
      }
    );
  });
}

module.exports = selectUserByTelegramId;
