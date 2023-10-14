import FootHolder from './component/footHolder/index.js';
import { palyGroundCss, palyRoomPageCss, playGroundTopUsersBoxCss } from './styles/playRoom.js';
import PlayerBox from './component/playerBox/index.js';
import usePlayersCards from './hooks/usePlayers.js';
import { PublicCards } from './component/publicCards/index.js';
import WaitingStart from './component/waitingStart/index.js';
import { infoContext } from '@/utils/infoContext.js';
import { SettleMoal } from './component/settleMoal/index.js';
import { CustomFloatButton } from './component/customFloatButton/index.js';


export function PlayRoom () {
    const [otherPlayers, player, room, victoryPlayers] = usePlayersCards();
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
                <div css={playGroundTopUsersBoxCss}>
                    {
                        otherPlayers?.map(player => <PlayerBox player={player} key={player.position}/>)
                    }
                </div>
                <PublicCards />
                {/* starting game or waiting */}
                {room && room.statu !== 'started'                 && 
                <WaitingStart isButtonPosition={isButtonPosition} hasOtherPlayers= {otherPlayers.length}/>}
            </div>
            {/* foot place for myPlayer to show its own cards */}
            <FootHolder key='footHolder'/>
        </div>
    </infoContext.Provider>;
}