import Card from '@/component/card/index.js';
import { emitSocket } from '@/utils/api.js';
import { infoContext } from '@/utils/infoContext.js';
import { css } from '@emotion/react';
import { Button, Modal, Popconfirm } from 'antd';
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
        if (room?.statu === 'settling' && victoryPlayers?.length) {
            return <div css={css`
                text-align: center;
            `}>
                <h2>Victory players</h2>
                {
                    victoryPlayers?.map(([player, victoryInfo]) => <div key={player.name}>
                        <Popconfirm  title={
                            <div css={css`
                                display: flex;
                                justify-content: space-around;
                                align-items: center;
                                width: 80vw;
                                padding-right: calc(100px - 80vw/5);
                                color: black;
                            `}>
                                {victoryInfo.cards && victoryInfo.cards.map(card => <Card {...card} key={card.key}/>)}
                            </div>
                        } placement='bottom' trigger={'click'} showCancel={false}
                            icon={<></>}>
                            <Button type="primary" shape="round">{player.name}: get chips {victoryInfo.getChips}, card type: {victoryInfo.cardName}</Button>
                        </Popconfirm>
                    </div>)
                }
            </div>;
        } 
        return <></>;
    }, [room?.statu, victoryPlayers]);

    return <Modal 
        title={<div css={css`
            text-align: center;
        `   }>Settle</div>} 
        open={room?.statu === 'settling' && modalOpen} 
        onCancel={() => {
            setModalOpen(false);
        }} 
        footer={
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