import { emitSocket, initSocket } from '@/utils/api.js';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { GptPredicateRes, PlayerInfoType, RoomInfo, VictoryInfo } from '../type.js';

export default function usePlayersCards (): [PlayerInfoType[], PlayerInfoType | undefined, RoomInfo | undefined, [PlayerInfoType, VictoryInfo][]] {
    const [otherPlayers, setOtherPlayers] = useState<PlayerInfoType[]>([]);
    const [myPlayer, setMyPlayer] = useState<PlayerInfoType>();
    const [victoryPlayers, setVictoryPlayers] = useState<[PlayerInfoType, VictoryInfo][]>([]);
    const [room, setRoom] = useState<RoomInfo>();
    const { roomId, userName } = useParams();
    const navigate = useNavigate();
  
    useEffect(() => {
        const socket = io('http://152.136.254.142:5000');
        // client-side
        socket.on('connect', () => {
            console.log('========== we are connecting ws ===========');
            initSocket(socket);
            // give room and player message to node serve
            socket.on('refuseConnect', (message: string) => {
                alert(message);
                socket.removeAllListeners();
                socket.disconnect();
                navigate('/');
            });

            // if repeat username, need use another username
            socket.on('updateUserName', (userName: string) => {
                navigate(`/playRoom/${roomId}/${userName}`);
            });

            // get room infomation
            socket.on('room', (room: RoomInfo) => {
                console.log(room);
                setRoom(room);
            });

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

            socket.on('getGptPredicate', (res: GptPredicateRes) => {
                console.log('getGptPredicate', res);
            });

            // give room and player message to node serve
            emitSocket('connectRoom', {
                roomId,
                userName,
            });
        });

        socket.on('disconnect', () => {
            message.info('已与房间断开连接');
            console.log('========== disconnected ws ===========');
        });

        // =================== Heartbeat Detection ====================
        socket.on('heartbeat', (callback) => {
            console.log('============ heartbeat ==================');
            
            callback();
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return [otherPlayers, myPlayer, room, victoryPlayers];
}