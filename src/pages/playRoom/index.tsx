import FootHolder from "./component/footHolder/index.js";
import { PlayerInfoType } from "./type.js";
import { useEffect, useState } from "react";
import Card from "@/component/card/index.js";
import { palyGroundCss, palyRoomPageCss, playGroundTopUsersBoxCss } from "./styles/playRoom.js";
import { Button } from "antd";
import PlayerBox from "./component/playerBox/index.js";
import { getOtherPlayersAndMyPlayer } from "./api.js";

export function PlayRoom() {
    const [otherPlayers, setOtherPlayers] = useState<PlayerInfoType[]>([]);
    const [myPlayer, setMyPlayer] = useState<PlayerInfoType>();

    const updatePlayers = () => {
        getOtherPlayersAndMyPlayer().then(item => {
            setOtherPlayers(item.otherPlayers)
            setMyPlayer(item.myPlayer);
        })
    }

    useEffect(() => {
        updatePlayers();
    }, [])

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
            {
                myPlayer?.holdCards?.map((e) => {
                    return <div key={e.color || '' + e?.number}>
                        <Card {...e} />
                    </div>
                })
            }
        </div>
        { myPlayer && <FootHolder player={myPlayer} key='footHolder'/>}
    </div>
}