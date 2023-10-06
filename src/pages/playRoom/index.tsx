import FootHolder from "./component/footHolder/index.js";
import { CardType, PlayerInfoType } from "./type.js";
import { useEffect, useState } from "react";
import Card from "@/component/card/index.js";
import { palyGroundCss, palyRoomPageCss, playGroundTopUsersBoxCss } from "./styles/playRoom.js";
import { Button } from "antd";
import PlayerBox from "./component/playerBox/index.js";
import { getOtherPlayersAndMyPlayer, getPublicCards } from "./api.js";

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

    const [publicCard, setPublicCards] = useState<CardType[]>([]);

    const updatePublicCards = () => {
        getPublicCards().then(res => {
            setPublicCards([...res]);
        })
    }

    useEffect(() => {
        updatePublicCards();
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
                publicCard?.map((e) => {
                    return <Card {...e} />
                })
            }
            <Button 
            key={'button2'}
            type='primary'
            onClick={() => {
                updatePublicCards();
            }}>next Cards</Button>
        </div>
        { myPlayer && <FootHolder player={myPlayer} key='footHolder'/>}
    </div>
}