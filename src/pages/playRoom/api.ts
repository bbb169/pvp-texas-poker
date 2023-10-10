import { emitSocket } from "@/utils/api.js";

// ========================= start game =========================
export function startGame(isShortCard = false) {
  return new Promise((resolve) => {
    emitSocket(`startGame`, isShortCard)
    resolve('success')
  })
}

// ========================= call chips =========================

export function callChips(callChips?: number) {
  return new Promise((resolve) => {
    emitSocket(`callChips`, callChips)
    resolve('success')
  })
}
