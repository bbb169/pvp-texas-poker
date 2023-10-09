import { NOOP } from "@/utils/index.js";
import { infoContext } from "@/utils/infoContext.js";
import { Modal } from "antd";
import { useContext, useMemo } from "react";

export function SettleMoal() {
    const { room, player, otherPlayers } = useContext(infoContext);

    const renderChildren = useMemo(() => {
      if (room?.statu === 'settling' && player && otherPlayers) {
        const allPlayers = [player, ...otherPlayers]

        let victoryPlayers = allPlayers.filter(playerItem => playerItem.status !== 'fold').map(playerItem => playerItem.name)
        
        return <div>
          <h3>victory player: {victoryPlayers.join(',')}</h3>
          <h3>get chips: {room.currentHasChips}</h3>
        </div>
      } else {
        return <></>
      }
    }, [room?.statu])

    return <Modal title="Settle" open={room?.statu === 'settling'} onCancel={NOOP} onOk={NOOP}>
        {renderChildren}
    </Modal>
}