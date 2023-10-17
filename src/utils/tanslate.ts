/* eslint-disable id-length */
import { privateKey } from '@/const.js';
import { CardColor, CardType } from '@/pages/playRoom/type.js';
import { AES } from 'crypto-js';

export const cardTypeTranslateMap = {
    'Straight Flush': '同花顺', 
    'Four of a Kind': '四条（金刚）', 
    'Full House': '葫芦', 
    Flush: '同花', 
    Straight: '顺子', 
    'Three of a Kind': '三条', 
    'Two Pair': '两对', 
    Pair: '一对', 
    'High Card': '高牌',
};

const suitMap: { [key: string]: CardColor} = {
    h:'hearts', 
    d:'diamonds', 
    c:'clubs', 
    s:'spades',
};

export function translateStringToCard (str: string): CardType {
    const rank = str.slice(0, str.length - 1);
    const suit = suitMap[str[str.length - 1]];

    return {
        key: AES.encrypt(suit + rank, privateKey).toString(),
        color: suit,
        number: rank,
        showFace: 'front',
        statu: 'undistributed',
    };
}