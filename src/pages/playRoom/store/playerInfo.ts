import { create } from 'zustand';

interface PlayerAudioInfo {
  playingPlayer: [Set<string>],
  addPlayingPlayer: (username: string) => void;
  deletePlayingPlayer: (username: string) => void;
}

export const usePlayerAudioInfo = create<PlayerAudioInfo>((set) => ({
    playingPlayer: [new Set()],
    addPlayingPlayer: (username) => set(({ playingPlayer }) => ({ playingPlayer: [playingPlayer[0].add(username)] })),
    deletePlayingPlayer:(username) => set(({ playingPlayer }) => {
        playingPlayer[0].delete(username);
        return ({ playingPlayer: [playingPlayer[0]] });
    }),
}));