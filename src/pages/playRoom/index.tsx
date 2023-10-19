import FootHolder from './component/footHolder/index.js';
import { palyGroundCss, palyRoomPageCss, playGroundTopUsersBoxCss } from './styles/playRoom.js';
import PlayerBox from './component/playerBox/index.js';
import useInfosFromSocket from './hooks/usePlayers.js';
import DemoCards from './component/demoCards/index.js';
import WaitingStart from './component/waitingStart/index.js';
import { infoContext } from '@/utils/infoContext.js';
import { SettleMoal } from './component/settleMoal/index.js';
import { CustomFloatButton } from './component/customFloatButton/index.js';
import { isEmpty } from '@/utils/index.js';
import { CardType } from './type.js';

export function PlayRoom () {
    const [otherPlayers, player, room, victoryPlayers] = useInfosFromSocket();
    const  isButtonPosition = Boolean(room && player && room.buttonIndex === player.position);
    
    return <infoContext.Provider value={{
        room,
        player,
        otherPlayers,
        victoryPlayers,
    }}>
        <div css={palyRoomPageCss}>
            <CustomFloatButton/>
            <SettleMoal/>
            <div css={palyGroundCss} key='playGround'>
                {/* show players avatar */}
                {!isEmpty(otherPlayers) && <div css={playGroundTopUsersBoxCss} data-intro="可以查看其它玩家信息">
                    {
                        otherPlayers.map(player => <PlayerBox player={player} key={player.position}/>)
                    }
                </div>}
                {!isEmpty(room?.publicCards) && <DemoCards data-intro="公共牌堆，随着轮次依次展示，所有牌均可拖动，但是有些不会改变牌的顺序" cards={room?.publicCards as CardType[]} />}
                {/* starting game or waiting */}
                {room && room.statu !== 'started'                 && 
                <WaitingStart isButtonPosition={isButtonPosition} hasOtherPlayers= {otherPlayers.length}/>}
            </div>
            {/* foot place for myPlayer to show its own cards */}
            <FootHolder key='footHolder'/>
        </div>
    </infoContext.Provider>;
}