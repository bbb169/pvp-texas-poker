import PlayerAvatar from '@/component/playerAvatar/index.js';
import { boxHoverShadow } from '@/styles/animation.js';
import { emitSocket } from '@/utils/api.js';
// import { emitSocket } from '@/utils/api.js';
import { css } from '@emotion/react';
import { Tooltip } from 'antd';
import { usePlayerAudioInfo } from '../../store/playerInfo.js';
import { PlayerInfoType } from '../../type.js';
import { ripplePlayerBoxCss, UsersBoxFlexCss } from './style.js';

const interactEmojis = ['sweat_smile', 'heart_eyes', 'hot_face'];

export default function PlayerBox ({ player } : { player: PlayerInfoType }) {
    const { playingPlayer } = usePlayerAudioInfo((state) => state);
    const isBarking = playingPlayer[0].has(player.name);
    
    const getPlayerSize = () => {
        return player.status.includes('calling') ? 64 : 32;
    };
    
    const size = getPlayerSize();

    const playerInfo = <div  css={css`
            display: flex;
        `}>
        <div>
            <div>{`${player.name} ${player.status}`}</div>
            <div>持有: {player.holdCent}</div>
            <div>已下注: {player.calledChips}</div>
            <div>已负债: {player.debt}</div>
            {isBarking && <div>正在狗叫...</div>}
            {<div>点击表情可互动</div>}
        </div>
        <div css={css`
            display: flex;
            flex-direction: column;
        `}>
            {
                interactEmojis.map(emoji => {
                    return <span key={emoji} onClick={() => {
                        emitSocket('sendEmoji', { 
                            target: player.name,
                            emoji,
                        });
                    }}>
                        <em-emoji id={emoji} size="1.3em"></em-emoji>
                    </span>;
                })
            }
        </div>
    </div>;

    return <>
        <div css={UsersBoxFlexCss(player.status.includes('fold') || player.status.includes('disconnect'))} key={player.position}>          
            <Tooltip title={playerInfo} placement='bottom'>
                <PlayerAvatar player={player} importCss={`
                    ${boxHoverShadow}
                    ${isBarking ? ripplePlayerBoxCss : ''}
                `} size={size}/>
            </Tooltip>
        </div>
    </>;
}