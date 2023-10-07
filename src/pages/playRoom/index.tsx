import FootHolder from "./component/footHolder/index.js";import { palyGroundCss, palyRoomPageCss, playGroundTopUsersBoxCss } from "./styles/playRoom.js";
import PlayerBox from "./component/playerBox/index.js";
import usePlayersCards from "./hooks/usePlayers.js";
import { PublicCards } from "./component/publicCards/index.js";

export function PlayRoom() {
    const [otherPlayers, myPlayer, publicCards] = usePlayersCards();
            
    return <div css={palyRoomPageCss}>
        <div css={palyGroundCss} key='playGround'>
            <div css={playGroundTopUsersBoxCss}>
                {
                    otherPlayers?.map(player => <PlayerBox player={player} key={player.position}/>)
                }
            </div>
            {publicCards && <PublicCards publicCard={publicCards}/>}
        </div>
        { myPlayer && <FootHolder player={myPlayer} key='footHolder'/>}
    </div>
}