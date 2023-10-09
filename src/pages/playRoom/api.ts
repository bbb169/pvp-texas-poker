import { emitSocket } from "@/utils/api.js";

// ========================= call chips =========================

export function callChips(callChips?: number) {
  return new Promise((resolve) => {
    emitSocket(`callChips`, callChips)
    resolve('success')
  })
}
