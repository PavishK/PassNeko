import db from "../lib/db.js";

async function init() {
  try {
    const Usersql = `
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await db.execute(Usersql);

    const Passwordssql=`
    CREATE TABLE IF NOT EXISTS wallets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    url VARCHAR(255),
    username VARCHAR(50),
    password TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
    );`;

    await db.execute(Passwordssql);

    console.log('\x1b[33m' + "Tables created successfully!" + '\x1b[0m');
    process.exit(0);
  } catch (error) {
    console.error(error);
    console.log('\x1b[31m' + "Error creating tables" + '\x1b[0m');
    process.exit(1);
  }
}

init();
