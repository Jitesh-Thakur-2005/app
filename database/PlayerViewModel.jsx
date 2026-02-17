import { create } from 'zustand';
import PlayerRepository from '../repository/PlayerRepository';
import {
  insertPlayer,
  getAllPlayers,
  getPlayerById,
} from './playerDao';
import {
  insertPlayerRecord,
  getPlayerRecordsByPlayerId,
  getAllPlayerRecords,
  getPlayerRecordById,
} from './playerRecordDao';

export const usePlayerStore = create((set, get) => ({

  // -------------------------
  // STATE (like MutableStateFlow)
  // -------------------------

  players: [],
  playerRecords: [],
  allPlayerRecords: [],

  name: '',
  age: '',
  height: 0,
  weight: 0,
  gender: 'Male',
  image: null, // base64 string


  // -------------------------
  // PLAYER METHODS
  // -------------------------

  setField: (field, value) => set({ [field]: value }),

  savePlayer: async () => {
    const { name, age, height, weight, gender, image } = get();

    await insertPlayer({
      name,
      age,
      height,
      weight,
      gender,
      playerImage: image,
    });

    get().fetchPlayers();
  },

  fetchPlayers: async () => {
    const data = await getAllPlayers();
    set({ players: data });
  },

  getPlayerById: async (playerId) => {
    return await getPlayerById(playerId);
  },


  // -------------------------
  // PLAYER RECORD METHODS
  // -------------------------

  savePlayerRecord: async (
    playerId,
    level,
    shuttles,
    cumulativeDistance,
    cumulativeTime,
    shuttleTime,
    speed
  ) => {
    await insertPlayerRecord({
      playerId,
      level,
      shuttles,
      cumulativeDistance,
      cumulativeTime,
      shuttleTime,
      speed,
    });

    const records = await getPlayerRecordsByPlayerId(playerId);
    set({ playerRecords: records });
  },

  fetchPlayerRecordsByPlayerId: async (playerId) => {
    const records = await getPlayerRecordsByPlayerId(playerId);
    set({ playerRecords: records });
  },

  fetchAllPlayerRecords: async () => {
    const records = await getAllPlayerRecords();
    set({ allPlayerRecords: records });
  },

  getPlayerRecordById: async (recordId) => {
    return await getPlayerRecordById(recordId);
  },

}));