import { emitSocket } from "@/utils/api.js";

// ========================= call chips =========================

export function callChips(roomId: string, userName: string, callChips?: number) {
  return new Promise((resolve) => {
    emitSocket(`callChips:${roomId}:${userName}`, callChips)
    resolve('success')
  })
}

export function playerFold(roomId: string, userName: string) {
  return new Promise((resolve) => {
    emitSocket(`fold:${roomId}:${userName}`)
    resolve('success')
  })
}
