// database.js

import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

let databaseInstance = null;

export const getDatabase = async () => {
  if (databaseInstance) {
    return databaseInstance;
  }

  try {
    const db = await SQLite.openDatabase({
      name: 'player_database.db',
      location: 'default',
    });

    databaseInstance = db;

    console.log('Database opened successfully');
    return db;
  } catch (error) {
    console.log('Error opening database:', error);
    throw error;
  }
};