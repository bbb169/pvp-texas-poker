import { message } from 'antd';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { PlayerInfoType, VictoryInfo } from '../type.js';

/** set players and victory infos */
export default function usePlayersInfo (socket: Socket | void): [PlayerInfoType[], PlayerInfoType | undefined, [PlayerInfoType, VictoryInfo][]] {
    const [otherPlayers, setOtherPlayers] = useState<PlayerInfoType[]>([]);
    const [myPlayer, setMyPlayer] = useState<PlayerInfoType>();
    const [victoryPlayers, setVictoryPlayers] = useState<[PlayerInfoType, VictoryInfo][]>([]);
  
    useEffect(() => {
        if (socket) {
            // get players infomation
            socket.on('user', ({
                myPlayer,
                otherPlayers,
            }: {
              myPlayer: PlayerInfoType,
              otherPlayers: PlayerInfoType[]
            }) => {
                if (myPlayer && otherPlayers) {
                    setMyPlayer(myPlayer);
                    setOtherPlayers(otherPlayers);
                }

                console.log('other:', otherPlayers, 'my:', myPlayer);
            });

            socket.on('victoryPlayers', (victoryPlayers: [PlayerInfoType, VictoryInfo][]) => {
                console.log('victoryPlayers', victoryPlayers);
    
                setVictoryPlayers(victoryPlayers);
            });

            socket.on('playersCalledRes', (playersCalledRes: [PlayerInfoType, string][]) => {
                console.log('playersCalledRes', playersCalledRes);

                playersCalledRes.forEach(([player, info]) => {
                    message.success(`${player.name} ${info}`);
                });
            });
        }
    }, [socket]);

    return [otherPlayers, myPlayer, victoryPlayers];
}