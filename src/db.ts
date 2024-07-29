import sqlite3, { Database } from 'sqlite3';

export function createDatabase(): Database {
  const db = new sqlite3.Database('database.sqlite', (err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
    } else {
      console.log('Conectado ao banco de dados SQLite.');
    }
  });
  db.serialize(() => {
    db.exec(`CREATE TABLE IF NOT EXISTS uploads (
              id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              url TEXT NOT NULL,
              type TEXT NOT NULL,
              size INT NOT NULL,
              createdAt TEXT NOT NULL DEFAULT current_timestamp);`);

    db.exec(`CREATE TABLE IF NOT EXISTS files (
              id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              url TEXT NOT NULL,
              type TEXT NOT NULL,
              size INT NOT NULL,
              uploadId INT NOT NULL,
              createdAt TEXT NOT NULL DEFAULT current_timestamp,
              FOREIGN KEY (uploadId) REFERENCES uploads (id) 
              ON DELETE CASCADE 
              ON UPDATE CASCADE);`);
  });

  return db;
}
