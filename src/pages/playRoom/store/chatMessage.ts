import { create } from 'zustand';
import { ChatMessageType } from '../type.js';

interface ChatMessageStore {
  chatMessage: {
    info: ChatMessageType[];
    unReadNum: number;
  },
  addMessage: (msg: Omit<ChatMessageType, 'key'>) => void;
  readMsg: () => void;
}

export const useChatMessageStore = create<ChatMessageStore>((set) => ({
    chatMessage: {
        info: [],
        unReadNum: 0,
    },
    addMessage: (msg) => set(({ chatMessage }) => {
        return ({
            chatMessage: {
                info: [...chatMessage.info, { ...msg, key: chatMessage.info.length }],
                unReadNum: chatMessage.unReadNum + 1,
            }, 
        });
    }),
    readMsg:() => set(({ chatMessage }) => {
        return ({
            chatMessage: { 
                ...chatMessage,
                unReadNum: 0, 
            }, 
        });
    }),
}));