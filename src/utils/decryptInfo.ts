import { privateKey } from '@/const.js';
import CryptoJS, { AES } from 'crypto-js';

export default function decryptInfo (info: any) {
    return JSON.parse(AES.decrypt(info, privateKey).toString(CryptoJS.enc.Utf8));
}