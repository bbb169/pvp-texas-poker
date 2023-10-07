import { useEffect, useState } from "react";
import { getOtherPlayersAndMyPlayer } from "../api.js";
import { PlayerInfoType } from "../type.js";

export default function usePlayers (): [PlayerInfoType[], PlayerInfoType | undefined, () => void] {
  const [otherPlayers, setOtherPlayers] = useState<PlayerInfoType[]>([]);
  const [myPlayer, setMyPlayer] = useState<PlayerInfoType>();

  const updatePlayers = () => {
      getOtherPlayersAndMyPlayer().then(item => {
          setOtherPlayers(item.otherPlayers)
          setMyPlayer(item.myPlayer);
      })
  }

  useEffect(() => {
      updatePlayers();
  }, [])

  return [otherPlayers, myPlayer, updatePlayers]
}