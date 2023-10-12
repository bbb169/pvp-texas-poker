import { PlayerInfoType, RoomInfo, VictoryInfo } from '@/pages/playRoom/type.js';
import { createContext } from 'react';

// share infomation
export const infoContext = createContext<{
  room?: RoomInfo,
  player?: PlayerInfoType,
  otherPlayers?: PlayerInfoType[],
  victoryPlayers?: [PlayerInfoType, VictoryInfo][]
}>({});