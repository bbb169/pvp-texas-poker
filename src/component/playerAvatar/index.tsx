import { PlayerInfoType } from '@/pages/playRoom/type.js';
import { css } from '@emotion/react';
import { Avatar, AvatarProps } from 'antd';

const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

export default function PlayerAvatar ({ player, importCss, ...restProps } : { player: PlayerInfoType; importCss?: string } & AvatarProps) {
    return <>
        <Avatar
            css={css`
                    background-color: ${ColorList[(player.position % 4)]};
                    text-align: center;
                    ${importCss}
                `}
            { 
                ...restProps 
            }>
            {player.name[0].toLocaleUpperCase()}
        </Avatar>
    </>;
}