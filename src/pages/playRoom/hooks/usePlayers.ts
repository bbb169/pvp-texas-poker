import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { getOtherPlayersAndMyPlayer } from "../api.js";
import { CardType, PlayerInfoType, RoomInfo } from "../type.js";

export default function usePlayersCards (): [PlayerInfoType[], PlayerInfoType | undefined, CardType[] | undefined] {
  const [otherPlayers, setOtherPlayers] = useState<PlayerInfoType[]>([]);
  const [myPlayer, setMyPlayer] = useState<PlayerInfoType>();
  const [room, setRoom] = useState<RoomInfo>();
  const { roomId, userName } = useParams();

  useEffect(() => {
      // updatePlayers();
      console.log(roomId, userName);
      
      const socket = io('http://localhost:4000');
      // client-side
      socket.on("connect", () => {
        console.log('========== we are connecting ws ===========');
        socket.on(`room:${roomId}`, (room: RoomInfo) => {
          console.log(room);
          setRoom(room)
        })
        socket.on(`user:${roomId}:${userName}`, (players: PlayerInfoType[]) => {
          const myPlayerIndex = players.findIndex(player => player.name === userName)
          const myPlayer = players.splice(myPlayerIndex, 1)[0];
          setMyPlayer(myPlayer)
          setOtherPlayers(players);
          
          console.log(players,myPlayer);
        })
        socket.emit('connectRoom', {
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

  return [otherPlayers, myPlayer, room?.publicCards]
}