import { emitSocket } from '@/utils/api.js';
import { infoContext } from '@/utils/infoContext.js';
import { cardTypeTranslateMap } from '@/utils/tanslate.js';
import { css } from '@emotion/react';
import { Button, Modal, Popconfirm } from 'antd';
import { useContext, useEffect, useMemo, useState } from 'react';
import DemoCards from '../demoCards/index.js';

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
                <h2>获胜玩家</h2>
                {
                    victoryPlayers?.map(([player, victoryInfo]) => <div key={player.name}>
                        <Popconfirm  title={
                            victoryInfo.cards
                                ? <DemoCards cards={victoryInfo.cards}/>
                                :                                                            <div>当前情况不能查看胜者牌型</div>
                        } placement='bottom' trigger={'click'} showCancel={false}
                            icon={<></>}>
                            <Button type="primary" shape="round">{player.name}: 收获筹码： {victoryInfo.getChips} {victoryInfo.cardName ? `，牌型: ${cardTypeTranslateMap[victoryInfo.cardName]}` : ''}</Button>
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
        `   }>结算</div>} 
        open={room?.statu === 'settling' && modalOpen} 
        onCancel={() => {
            setModalOpen(false);
        }} 
        footer={
            <Button onClick={() => {
                setModalOpen(false);
                isButtonPlayer && emitSocket('turnToNextGame');
            }} type="primary" shape="round">
                {isButtonPlayer ? '开始下一轮' : '确认'}
            </Button>
        }>
        {renderChildren}
    </Modal>;
}