import Card from '@/component/card/index.js';
import { emitSocket } from '@/utils/api.js';
import { infoContext } from '@/utils/infoContext.js';
import { css } from '@emotion/react';
import { Button, Modal } from 'antd';
import { useContext, useEffect, useMemo, useState } from 'react';

export function SettleMoal () {
    const { room, player, victoryPlayers } = useContext(infoContext);
    const [modalOpen, setModalOpen] = useState(true);
    const isButtonPlayer = room?.buttonIndex === player?.position;

    // reset modalOpen
    useEffect(() => {
        if (room?.statu !== 'settling') {
            setModalOpen(true);
        }
    }, [room?.statu]);

    const renderChildren = useMemo(() => {
        if (room?.statu === 'settling' && victoryPlayers) {
            return <div>
                <h2>Victory players</h2>
                {
                    victoryPlayers?.map(([player, victoryInfo]) => <div key={player.name}>
                        <h3>{player.name}: get chips {victoryInfo.getChips}, card type: {victoryInfo.cardName}</h3>
                        <div css={css`
                            display: flex;
                            align-items: center;
                            background-color: rgb(240,240,240);
                            padding: 8px 0px;
                        `}>
                            {victoryInfo.cards && victoryInfo.cards.map(card => <Card {...card} key={card.key}/>)}
                        </div>
                    </div>)
                }
            </div>;
        } 
        return <></>;
    }, [room?.statu, victoryPlayers]);

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