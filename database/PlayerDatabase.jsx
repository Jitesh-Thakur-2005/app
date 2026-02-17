import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

let databaseInstance = null;

const DATABASE_NAME = 'player_database.db';
const DATABASE_VERSION = 2;

/**
 * Initialize Database (Singleton)
 */
export const getDatabase = async () => {
  if (databaseInstance) {
    return databaseInstance;
  }

  const db = await SQLite.openDatabase({
    name: DATABASE_NAME,
    location: 'default',
  });

  databaseInstance = db;

  await initializeDatabase(db);

  return db;
};


/**
 * Initialize tables & handle migration
 */
const initializeDatabase = async (db) => {
  // Create version tracking table
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS db_version (
      version INTEGER
    );
  `);

  const result = await db.executeSql(`SELECT version FROM db_version LIMIT 1`);

  let currentVersion = 0;

  if (result[0].rows.length > 0) {
    currentVersion = result[0].rows.item(0).version;
  }

  if (currentVersion < 1) {
    await createVersion1Tables(db);
    await setDatabaseVersion(db, 1);
    currentVersion = 1;
  }

  if (currentVersion < 2) {
    await migration_1_2(db);
    await setDatabaseVersion(db, 2);
  }
};


/**
 * Version 1 Tables
 */
const createVersion1Tables = async (db) => {
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS player_table (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      age INTEGER
    );
  `);
};


/**
 * Migration 1 → 2
 * Equivalent to MIGRATION_1_2 in Room
 */
const migration_1_2 = async (db) => {
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS player_record_table (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      playerId INTEGER NOT NULL,
      level INTEGER NOT NULL,
      shuttles INTEGER NOT NULL,
      cumulativeDistance INTEGER NOT NULL,
      cumulativeTime REAL NOT NULL,
      shuttleTime REAL NOT NULL,
      speed REAL NOT NULL
    );
  `);
};


/**
 * Save DB version
 */
const setDatabaseVersion = async (db, version) => {
  await db.executeSql(`DELETE FROM db_version`);
  await db.executeSql(
    `INSERT INTO db_version (version) VALUES (?)`,
    [version]
  );
};
