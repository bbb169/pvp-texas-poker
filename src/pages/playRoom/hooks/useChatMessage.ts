import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { useChatMessageStore } from '../store/chatMessage.js';
import { ChatMessageType } from '../type.js';

/** set room infomation */
export default function useChatMessage (socket: Socket | void) {
    const { addMessage } = useChatMessageStore();

    useEffect(() => {
        if (socket) {
            socket.on('receiveMessage', (msg: Omit<ChatMessageType, 'key'>) => {
                console.log(msg);
                addMessage(msg);
            });
        }
    }, [socket]);
}