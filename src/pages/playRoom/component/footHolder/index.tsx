import { CallChipsPicker } from '@/component/callChipsPicker/index.js';
import Card from '@/component/card/index.js';
import DragableItem from '@/component/dragableItem/index.js';
import { isEmpty } from '@/utils/index.js';
import { infoContext } from '@/utils/infoContext.js';
import { DollarOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Button, Space } from 'antd';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { CardType } from '../../type.js';
import { footHolderBlueBorderBox, footHolderBoxCss } from './style.js';

export default function FootHolder () {
    const { player, room } = useContext(infoContext);
    const [holderCards, setHolderCards] = useState<CardType[] | undefined>(player?.holdCards);

    useEffect(() => {
        setHolderCards(player?.holdCards);
    }, [player]);

    if (!player || !room) {
        return <></>;
    }

    const isCalling = player.status.includes('calling') && room.statu === 'started';

    return <div css={footHolderBlueBorderBox(true)}>
        <div css={footHolderBoxCss}>
            {isCalling && <CallChipsPicker />}
            {!isEmpty(holderCards) && <div css={css`
                display: flex;
                justify-content: space-evenly;
                flex: 3;
            `}
                data-intro="此处为您持有的牌型"
            >
                <DragableItem 
                    dataSource={holderCards} 
                    setDataSource={setHolderCards as React.Dispatch<React.SetStateAction<CardType[]>>} 
                    renderFunc={(e) => <Card {...e as CardType} />}
                />
            </div>}
            {/* ================ Chips Account ================ */}
            <Space css={css`
                display: flex;
                flex-direction: column;
                flex: 2;
            `}
                data-intro="此处为您的筹码和游戏信息">
                <Button icon={<DollarOutlined />} type="primary"shape="round">盲注: {player.blind}</Button>
                <Button icon={<DollarOutlined />} type="primary" shape="round">已投注: {player.calledChips}</Button>
                <Button icon={<DollarOutlined />} type="primary" shape="round" danger>现持有:{player.holdCent}</Button>
                {room && room.statu !== 'waiting' && <Button icon={<DollarOutlined />} type="primary" shape="round">现最小下注:{Math.max(room?.currentCallChips, player.blind, 0)}</Button>}
            </Space>
        </div>
    </div>;
}