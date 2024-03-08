const sqlite3 = require("sqlite3").verbose();

// Open a connection to the SQLite database
const db = new sqlite3.Database("../database.db");

// Define SQL commands to drop tables
const dropUsersTableQuery = `
    DROP TABLE IF EXISTS users
`;

const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        telegram_id INTEGER UNIQUE,
        name TEXT,
        status TEXT,
        last_message_sent INTEGER,
        last_message_sent_at TEXT
    )
`;

// Run SQL commands to drop tables
db.serialize(() => {
  // Drop tables
  db.run(dropUsersTableQuery);

  // Create tables
  db.run(createUsersTableQuery, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Users table created");
    }
  });

  // Close the database connection after all commands have been executed
  db.close();
});
