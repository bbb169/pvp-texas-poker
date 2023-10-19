import { Socket } from 'socket.io-client';
export const apiHost = process.env.NODE_ENV === 'production' ? 'http://152.136.254.142' : 'http://localhost';
export const apiPort = '5000';

let socket: Socket;

export function initSocket (newSocket: Socket) {
    socket = newSocket;
}

export function emitSocket (ev: string, ...args: any[]) {
    if (socket) {
        socket.emit(ev, ...args);
    } else {
        alert('socket is unlink');
    }
}