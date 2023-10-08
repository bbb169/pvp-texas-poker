import { PlayerInfoType, RoomInfo } from "@/pages/playRoom/type.js";
import { createContext } from "react";

// share infomation
export const infoContext = createContext<{
  room?: RoomInfo,
  player?: PlayerInfoType,
}>({});