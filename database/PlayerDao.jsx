import { getDatabase } from './database';

/**
 * Insert player (REPLACE on conflict)
 */
export const insertPlayer = async (player) => {
  const db = await getDatabase();

  await db.executeSql(
    `INSERT OR REPLACE INTO player_table (id, name, score)
     VALUES (?, ?, ?)`,
    [player.id, player.name, player.score]
  );
};


/**
 * Get all players
 * (Equivalent to Flow<List<PlayerDataClass>> but returns Promise)
 */
export const getAllPlayers = async () => {
  const db = await getDatabase();

  const result = await db.executeSql(
    `SELECT * FROM player_table`
  );

  const rows = result[0].rows;
  let players = [];

  for (let i = 0; i < rows.length; i++) {
    players.push(rows.item(i));
  }

  return players;
};


/**
 * Get player by ID
 */
export const getPlayerById = async (playerId) => {
  const db = await getDatabase();

  const result = await db.executeSql(
    `SELECT * FROM player_table WHERE id = ?`,
    [playerId]
  );

  if (result[0].rows.length > 0) {
    return result[0].rows.item(0);
  }

  return null;
};


/**
 * Update player
 */
export const updatePlayer = async (player) => {
  const db = await getDatabase();

  await db.executeSql(
    `UPDATE player_table
     SET name = ?, score = ?
     WHERE id = ?`,
    [player.name, player.score, player.id]
  );
};
