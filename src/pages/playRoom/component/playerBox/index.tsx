import { boxHoverShadow } from '@/styles/animation.js';
import { css } from '@emotion/react';
import { Avatar, Tooltip } from 'antd';
import { PlayerInfoType } from '../../type.js';
import { UsersBoxFlexCss } from './style.js';

export default function PlayerBox ({ player } : { player: PlayerInfoType }) {
    const getPlayerSize = () => {
        return player.status.includes('calling') ? 64 : 32;
    };

    const size = getPlayerSize();

    const playerInfo = <div>
        <div>{`${player.name} ${player.status}`}</div>
        <div>hold: {player.holdCent}</div>
        <div>betted: {player.calledChips}</div>
    </div>;

    return <>
        <div css={UsersBoxFlexCss(player.status.includes('fold') || player.status.includes('disconnect'))} key={player.position}>          
            <Tooltip title={playerInfo} placement='bottom'>
                <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${player.position}`} size={size} css={css`
            ${boxHoverShadow}
          `}/>
            </Tooltip>
        </div>
    </>;
}