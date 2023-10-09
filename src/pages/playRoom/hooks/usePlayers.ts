import { emitSocket, initSocket } from "@/utils/api.js";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { PlayerInfoType, RoomInfo } from "../type.js";

export default function usePlayersCards (): [PlayerInfoType[], PlayerInfoType | undefined, RoomInfo | undefined] {
  const [otherPlayers, setOtherPlayers] = useState<PlayerInfoType[]>([]);
  const [myPlayer, setMyPlayer] = useState<PlayerInfoType>();
  const [room, setRoom] = useState<RoomInfo>();
  const { roomId, userName } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
      const socket = io('http://localhost:4000');
      // client-side
      socket.on("connect", () => {
        console.log('========== we are connecting ws ===========');
        initSocket(socket);
        socket.on('updateUserName', (userName: string) => {
          navigate(`/playRoom/${roomId}/${userName}`);
        })
        socket.on(`room`, (room: RoomInfo) => {
          console.log(room);
          setRoom(room)
        })
        socket.on(`user`, ({
          myPlayer,
          otherPlayers
        }: {
          myPlayer: PlayerInfoType,
          otherPlayers: PlayerInfoType[]
        }) => {
          setMyPlayer(myPlayer)
          setOtherPlayers(otherPlayers);
          
          console.log('other:',otherPlayers,'my:',myPlayer);
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