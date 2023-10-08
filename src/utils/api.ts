import { Socket } from "socket.io-client";

let socket: Socket;

export function initSocket(newSocket: Socket) {
  socket = newSocket;
}

export function emitSocket(ev: string, ...args: any[]) {
  if (socket) {
    socket.emit(ev,...args)
  } else {
    alert('socket is unlink')
  }
}