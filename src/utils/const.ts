/* eslint-disable id-length */
import { privateKey } from '@/const.js';
import { CardColor, CardType } from '@/pages/playRoom/type.js';
import { AES } from 'crypto-js';


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