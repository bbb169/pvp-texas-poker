import { boxHoverShadow } from '@/styles/animation.js';
import { css } from '@emotion/react';
import { Avatar, Tooltip } from 'antd';
import { PlayerInfoType } from '../../type.js';
import { UsersBoxFlexCss } from './style.js';

export default function PlayerBox({ player } : { player: PlayerInfoType }) {
    const getPlayerSize = () => {
        return player.status === 'calling' ? 64 : 32;
    }

    const size = getPlayerSize()

    return <>
      <div css={UsersBoxFlexCss} key={player.position}>          
        <Tooltip title={player.name} placement='bottom'>
          <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${player.position}`} size={size} css={css`
            ${boxHoverShadow}
          `}/>
        </Tooltip>
      </div>
    </>
}