import { boxHoverShadow } from '@/styles/animation.js';
import { css } from '@emotion/react';
import { Avatar, Tooltip } from 'antd';
import { usePlayerAudioInfo } from '../../store/playerInfo.js';
import { PlayerInfoType } from '../../type.js';
import { ripplePlayerBoxCss, UsersBoxFlexCss } from './style.js';

const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

export default function PlayerBox ({ player } : { player: PlayerInfoType }) {
    const { playingPlayer } = usePlayerAudioInfo((state) => state);
    const isBarking = playingPlayer[0].has(player.name);
    
    const getPlayerSize = () => {
        return player.status.includes('calling') ? 64 : 32;
    };

    const size = getPlayerSize();

    const playerInfo = <div>
        <div>{`${player.name} ${player.status}`}</div>
        <div>持有: {player.holdCent}</div>
        <div>已下注: {player.calledChips}</div>
        <div>已负债: {player.debt}</div>
        {isBarking && <div>正在狗叫...</div>}
    </div>;

    return <>
        <div css={UsersBoxFlexCss(player.status.includes('fold') || player.status.includes('disconnect'))} key={player.position}>          
            <Tooltip title={playerInfo} placement='bottom'>
                <Avatar size={size} css={css`
                    background-color: ${ColorList[(player.position % 4)]};
                    text-align: center;
                    ${boxHoverShadow}
                    ${isBarking ? ripplePlayerBoxCss : ''}
                `}>
                    {player.name[0].toLocaleUpperCase()}
                </Avatar>
            </Tooltip>
        </div>
    </>;
}