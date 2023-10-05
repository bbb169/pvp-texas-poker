import { privateKey } from "@/const.js";
import { AES } from "crypto-js";
import { CardColor, CardType, PlayerInfoType } from "./type.js"

const holderCards: CardType[] = ['hearts', 'spades'].map((item) => {
  const number = Math.round(Math.random() * 10);
  return {
      key: AES.encrypt(item + number, privateKey).toString(),
      color: item as CardColor,
      number,
      showFace: 'front',
      holder: 'bbb169',
      statu: 'distributed'
  }
})

let currentPlayer = 0;

function getAllPlayersInfo(): Promise<PlayerInfoType[]> {
  currentPlayer = (++currentPlayer)%8 || 8

  return new Promise((resolve) => {
    resolve([3,2,1,8,7,6,5,4].map((item) => {
      return {
        name: `player-${item}`,
        position: item,
        status: item === currentPlayer ? 'calling' : 'waiting',
        holdCards: item === 4 ? holderCards : undefined,
        holdCent: 10,
      }
    }))
  })
}

// ==================== split players ==============

let myPlayer: PlayerInfoType;

export async function getOtherPlayersAndMyPlayer(): Promise<{
  myPlayer: PlayerInfoType,
  otherPlayers: PlayerInfoType[],
}> {
  const players = await getAllPlayersInfo();
  const myPlayer = players.pop() as PlayerInfoType;
  const otherPlayers: PlayerInfoType[] = players;

  return {
    myPlayer,
    otherPlayers,
  };
}

export async function getMyPlaer() {
  return myPlayer || (await getOtherPlayersAndMyPlayer()).myPlayer
}