import {
  insertPlayerRecord,
  getPlayerRecordsByPlayerId,
  getPlayerRecordById,
} from './playerRecordDao';

class PlayerRepository {

  /**
   * Insert Player Record
   */
  async insertPlayerRecord(record) {
    return await insertPlayerRecord(record);
  }

  /**
   * Get Records By Player ID
   */
  async getPlayerRecordsByPlayerId(playerId) {
    return await getPlayerRecordsByPlayerId(playerId);
  }

  /**
   * Get Record By ID
   */
  async getPlayerRecordById(recordId) {
    return await getPlayerRecordById(recordId);
  }
}

export default new PlayerRepository();
