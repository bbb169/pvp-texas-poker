import { emitSocket, initSocket } from "@/utils/api.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import { PlayerInfoType, RoomInfo } from "../type.js";

export default function usePlayersCards (): [PlayerInfoType[], PlayerInfoType | undefined, RoomInfo | undefined] {
  const [otherPlayers, setOtherPlayers] = useState<PlayerInfoType[]>([]);
  const [myPlayer, setMyPlayer] = useState<PlayerInfoType>();
  const [room, setRoom] = useState<RoomInfo>();
  const { roomId, userName } = useParams();

  useEffect(() => {
      const socket = io('http://localhost:4000');
      // client-side
      socket.on("connect", () => {
        console.log('========== we are connecting ws ===========');
        initSocket(socket);
        socket.on(`room:${roomId}`, (room: RoomInfo) => {
          console.log(room);
          setRoom(room)
        })
        socket.on(`user:${roomId}:${userName}`, (players:PlayerInfoType[]) => {
          console.log(players);
          
          const myPlayerIndex = players.findIndex(player => player.name === userName)
          const myPlayer = players.splice(myPlayerIndex, 1)[0];
          setMyPlayer(myPlayer)
          setOtherPlayers(players);
          
          console.log(players,myPlayer);
        })

        emitSocket('connectRoom', {
          roomId,
          userName
        })
      });

      socket.on("disconnect", () => {
        console.log('========== disconnected ws ===========');
      });

      return () => { 
        socket.disconnect();
      };
  }, [])

  return [otherPlayers, myPlayer, room]
}