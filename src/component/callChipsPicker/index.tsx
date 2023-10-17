import { callChips } from '@/pages/playRoom/api.js';
import { infoContext } from '@/utils/infoContext.js';
import { css } from '@emotion/react';
import { Button, Space } from 'antd';
import { useContext } from 'react';
import { SliderChipsPicker } from './sliderChipsPicker.js';

const basicCallCents = [0, 5, 10, 20];

export function CallChipsPicker () {
    const { player, room } = useContext(infoContext);

    if (!player || !room) {
        return <></>;
    }

    const minCallableChips = Math.max(room?.currentCallChips, player.blind, 0);

    return <Space css={css`
    position: absolute;
    top: -100px
  `} direction='vertical' data-intro="当轮到您下注时，请选择自己想要的下注大小">
        <Space css={css`
            flex-wrap: wrap;
            justify-content: center;
        `}>
            {
                basicCallCents.map(item => {
                    const isEffectCall = item <= player.holdCent && item + player.calledChips >= minCallableChips;

                    return isEffectCall && <Button type="primary" shape="round" key={item} onClick={() => callChips(item)}>
                        +{item}
                    </Button>;
                })
            }
            <SliderChipsPicker player={player} minCallableChips={minCallableChips} data-intro="点击这里可以通过滑动条灵活选择"/>
            <Button type="primary" shape="round" danger onClick={() => callChips(player.holdCent)}>
                全下
            </Button>
            <Button type="primary" shape="round" danger onClick={() => {
                callChips();
            }}>
                弃牌
            </Button>
            {room.statu !== 'waiting' && <Button type="primary"shape="round">游戏规则: {room.isShortCards === false ? '长牌' : '短牌'}</Button>}
            {player.debt !== 0 && <Button type="primary"shape="round">您已负债:{player.debt}</Button>}
        </Space>
    </Space>;
}