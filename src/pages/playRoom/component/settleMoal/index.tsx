import { emitSocket } from '@/utils/api.js';
import { infoContext } from '@/utils/infoContext.js';
import { Button, Modal } from 'antd';
import { useContext, useEffect, useMemo, useState } from 'react';

export function SettleMoal () {
    const { room, player, otherPlayers, victoryPlayers } = useContext(infoContext);
    const [modalOpen, setModalOpen] = useState(true);
    const isButtonPlayer = room?.buttonIndex === player?.position;

    // reset modalOpen
    useEffect(() => {
        if (room?.statu !== 'settling') {
            setModalOpen(true);
        }
    }, [room?.statu]);

    const renderChildren = useMemo(() => {
        if (room?.statu === 'settling' && player && otherPlayers) {
            return <div>
                <h2>Victory players</h2>
                {
                    victoryPlayers?.map(([player, getChips]) => <h3 key={player.name}>{player.name}: get chips {getChips}</h3>)
                }
            </div>;
        } 
        return <></>;
    }, [room?.statu]);

    return <Modal title="Settle" open={room?.statu === 'settling' && modalOpen} onCancel={() => {
        setModalOpen(false);
    }} footer={
        <Button onClick={() => {
            setModalOpen(false);
            isButtonPlayer && emitSocket('turnToNextGame');
        }} type="primary" shape="round">
            {isButtonPlayer ? 'turn to next game' : 'ok'}
        </Button>
    }>
        {renderChildren}
    </Modal>;
}