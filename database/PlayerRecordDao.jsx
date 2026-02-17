import { getDatabase } from './database';

/**
 * Insert Player Record (REPLACE on conflict)
 * Returns inserted row ID
 */
export const insertPlayerRecord = async (record) => {
  const db = await getDatabase();

  const result = await db.executeSql(
    `INSERT OR REPLACE INTO player_record_table
     (id, playerId, level, shuttles, cumulativeDistance, cumulativeTime, shuttleTime, speed)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      record.id,
      record.playerId,
      record.level,
      record.shuttles,
      record.cumulativeDistance,
      record.cumulativeTime,
      record.shuttleTime,
      record.speed,
    ]
  );

  return result[0].insertId;
};
export const getPlayerRecordsByPlayerId = async (playerId) => {
  const db = await getDatabase();

  const result = await db.executeSql(
    `SELECT * FROM player_record_table WHERE playerId = ?`,
    [playerId]
  );

  const rows = result[0].rows;
  let records = [];

  for (let i = 0; i < rows.length; i++) {
    records.push(rows.item(i));
  }

  return records;
};
export const getPlayerRecordById = async (recordId) => {
  const db = await getDatabase();

  const result = await db.executeSql(
    `SELECT * FROM player_record_table WHERE id = ?`,
    [recordId]
  );

  if (result[0].rows.length > 0) {
    return result[0].rows.item(0);
  }

  return null;
};
export const getAllPlayerRecords = async () => {
  const db = await getDatabase();

  const result = await db.executeSql(
    `SELECT * FROM player_record_table`
  );

  const rows = result[0].rows;
  let records = [];

  for (let i = 0; i < rows.length; i++) {
    records.push(rows.item(i));
  }

  return records;
};
