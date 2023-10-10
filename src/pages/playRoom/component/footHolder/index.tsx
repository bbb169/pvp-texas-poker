import { CallChipsPicker } from '@/component/callChipsPicker/index.js';
import Card from '@/component/card/index.js';
import DragableItem from '@/component/dragableItem/index.js';
import { infoContext } from '@/utils/infoContext.js';
import { DollarOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Button, Space } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { CardType } from '../../type.js';
import { footHolderBlueBorderBox, footHolderBoxCss } from './style.js';

export default function FootHolder() {
    const { player, room } = useContext(infoContext);
    const [holderCards, setHolderCards] = useState<CardType[] | undefined>(player?.holdCards);

    useEffect(() => {
        setHolderCards(player?.holdCards)
    }, [player])

    if (!player || !room) {
        return <></>
    }

    const isCalling = player.status === 'calling';

    return <div css={footHolderBlueBorderBox(isCalling)}>
        <div css={footHolderBoxCss}>
            {isCalling && <CallChipsPicker />}
            {
                holderCards && <DragableItem 
                    dataSource={holderCards} 
                    setDataSource={setHolderCards as React.Dispatch<React.SetStateAction<CardType[]>>} 
                    renderFunc={(e) => <Card {...e as CardType} />}
                />
            }
            {/* ================ Chips Account ================ */}
            <Space css={css`
                display: flex;
                flex-direction: column;
            `}>
            <Button icon={<DollarOutlined />} type="primary"shape="round">Blind: {player.blind}</Button>
            <Button icon={<DollarOutlined />} type="primary" shape="round">Betted: {player.calledChips}</Button>
            <Button icon={<DollarOutlined />} type="primary" shape="round" danger>Holding:{player.holdCent}</Button>
            {room && room.statu !== 'waiting' && <Button icon={<DollarOutlined />} type="primary" shape="round">Minimum Call:{Math.max(room?.currentCallChips, player.blind, 0)}</Button>}
            </Space>
        </div>
    </div>
}