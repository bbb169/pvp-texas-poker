import { cardTypeTranslateMap } from '@/utils/tanslate.js';

export type CardColor = 'diamonds' | 'hearts' | 'spades' | 'clubs';
export type CardStatu = 'undistributed' | 'distributed' | 'determineVictory';
export type CardShowFace = 'front' | 'back';

export interface CardType {
    key: string;
    color: 'diamonds' | 'hearts' | 'spades' | 'clubs';
    number: number | string;
    /** which face is the card toward to */
    showFace: 'front' | 'back';
    /** who is the card belong to */
    holder?: string;
    statu: 'undistributed' | 'distributed' | 'determineVictory';
}

export type PlayerInfoStatusType = 'disconnect' | 'calling' | 'waiting' | 'fold';
export interface PlayerInfoType {
  name: string;
  position: number;
  status: PlayerInfoStatusType[];
  holdCards: CardType[];
  calledChips: number;
  holdCent: number;
  blind: number;
}

export interface RoomInfo {
  publicCards: CardType[];
  players: PlayerInfoType[];
  buttonIndex: number;
  playerMap: Set<string>;
  statu: 'waiting' | 'started' | 'settling',
  currentCallChips: number;
  currentHasChips: number;
  smallBlind: number;
  bigBlind: number;
}

export interface VictoryInfo {
  getChips: number;
  cardName?: keyof typeof cardTypeTranslateMap;
  cards?: CardType[];
}

export interface GptPredicateRes {
  winRate: number;
  publcHighestCards: CardType[];
  userHighestCards: CardType[];
}