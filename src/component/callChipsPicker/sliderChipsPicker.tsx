import { callChips } from '@/pages/playRoom/api.js';
import { PlayerInfoType } from '@/pages/playRoom/type.js';
import { css } from '@emotion/react';
import { Button, Slider, Tooltip } from 'antd';
import { useState } from 'react';

export function SliderChipsPicker ({ player, minCallableChips } : { player: PlayerInfoType, minCallableChips: number }) {
    const [callingChips, setCallingChips] = useState(minCallableChips - player.calledChips);

    return <>
        <Tooltip title={
            // ========== popup =================
            <div css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 8px 4px;
                max-width: 100px;
                white-space: nowrap;
            `}>
                +{callingChips}
                <Slider css={css`
                    width: 100px;
                `} value={callingChips} min={minCallableChips - player.calledChips} max={player.holdCent}
                    onChange={(value: number) => setCallingChips(value)}/>
                <Button type="primary" shape="round" onClick={() => {         
                    callChips(callingChips);
                }} danger={callingChips === player.holdCent}>
                    拖动并确认
                </Button>
            </div>
            // ========== popup =================
        } trigger={'click'}>
            <Button type="primary" shape="round">
                更多选择
            </Button>
        </Tooltip>
    </>;
}