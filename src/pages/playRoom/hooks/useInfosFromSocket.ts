import { apiHost, apiPort, emitSocket, initSocket } from '@/utils/api.js';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { GptPredicateRes, PlayerInfoType, RoomInfo, VictoryInfo } from '../type.js';
import useChatMessage from './useChatMessage.js';
import usePlayersInfo from './usePlayersInfo.js';
import useRoom from './useRoom.js';

export default function useInfosFromSocket (): [PlayerInfoType[], PlayerInfoType | undefined, RoomInfo | undefined, [PlayerInfoType, VictoryInfo][], Socket | void] {
    const [socket, setSocket] = useState<Socket | void>();
    const [room] = useRoom(socket);
    const [otherPlayers, myPlayer, victoryPlayers] = usePlayersInfo(socket);
    useChatMessage(socket);
    const { roomId, userName } = useParams();
    const navigate = useNavigate();
  
    useEffect(() => {
        if (!socket) {
            setSocket(io(`${apiHost}:${apiPort}`));
        } else {
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
                message.info('已与房间断开连接,可重新进入房间');
                setSocket();
                console.log('========== disconnected ws ===========');
            });

            // =================== Heartbeat Detection ====================
            setInterval(() => {
                console.log('======== heartDetect ============ ');
                
                emitSocket('heartDetect');
            }, 10000);
        }

        return () => {
            if (socket) {
                console.log('dis');
                
                socket.disconnect();
            }
        };
    }, [socket]);

    return [otherPlayers, myPlayer, room, victoryPlayers, socket];
}