import { infoContext } from "@/utils/infoContext.js";
import { Modal } from "antd";
import { useContext, useMemo } from "react";

export function SettleMoal() {
    const { room, player } = useContext(infoContext);

    const renderChildren = useMemo(() => {
      if (room?.statu === 'settling' && player) {
        const allPlayers = [player, ...room.players]

        let victoryPlayers = allPlayers.filter(playerItem => playerItem.status !== 'fold')
        
        return <div>
          <h1>victory player: {victoryPlayers.join(',')}</h1>
          <h1>get chips: {room.currentHasChips}</h1>
        </div>
      } else {
        return <></>
      }
    }, [room?.statu])

    return <Modal title="Basic Modal" open={room?.statu === 'settling'}>
        {renderChildren}
    </Modal>
}