import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { RoomInfo } from '../type.js';

/** set room infomation */
export default function useRoom (socket: Socket | void): [RoomInfo | undefined] {
    const [room, setRoom] = useState<RoomInfo>();
  
    useEffect(() => {
        if (socket) {
            socket.on('room', (room: RoomInfo) => {
                console.log(room);
                setRoom(room);
            });
        }
    }, [socket]);

    return [room];
}