import { cardTypeTranslateMap } from '@/utils/tanslate.js';

export type CardColor = 'diamonds' | 'hearts' | 'spades' | 'clubs';
export type CardStatu = 'undistributed' | 'distributed' | 'determineVictory';
export type CardShowFace = 'front' | 'back';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
      interface IntrinsicElements {
          'em-emoji': any;
      }
  }
}

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
  debt: number;
  calledChips: number;
  holdCent: number;
  blind: number;
  /** whether called in one round */
  roundCalled: boolean;
}

export interface RoomInfo {
  publicCards: CardType[];
  players: Map<string, PlayerInfoType>;
  buttonIndex: number;
  statu: 'waiting' | 'started' | 'settling';
  currentCallChips: number;
  currentHasChips: number;
  callingSteps: number;
  smallBlind: number;
  bigBlind: number;
  isShortCards: boolean;
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

export interface ChatMessageType { 
  key: string | number, 
  player: PlayerInfoType, 
  msg: string 
}


export interface EmojiInfo { 
  target: string;
  emoji: string;
}