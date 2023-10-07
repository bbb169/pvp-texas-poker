import FootHolder from "./component/footHolder/index.js";import { palyGroundCss, palyRoomPageCss, playGroundTopUsersBoxCss } from "./styles/playRoom.js";
import { Button } from "antd";
import PlayerBox from "./component/playerBox/index.js";
import usePlayers from "./hooks/usePlayers.js";
import { PublicCard } from "./component/publicCards/index.js";

export function PlayRoom() {
    const [otherPlayers, myPlayer, updatePlayers] = usePlayers();
            
    return <div css={palyRoomPageCss}>
        <div css={palyGroundCss} key='playGround'>
            <div css={playGroundTopUsersBoxCss}>
                {
                    otherPlayers.map(player => <PlayerBox player={player} key={player.position}/>)
                }
                <Button 
                key={'button'}
                type='primary'
                onClick={() => {
                    updatePlayers();
                }}>next Player</Button>
            </div>
            <PublicCard/>
        </div>
        { myPlayer && <FootHolder player={myPlayer} key='footHolder'/>}
    </div>
}