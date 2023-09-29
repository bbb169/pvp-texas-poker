import { FootHolder } from "./component/footHolder/index.js";
import { CardColor, CardType } from "./type.js";
import { useState } from "react";
import Card from "@/component/card/index.js";
import { palyGroundCss, palyRoomPageCss } from "./styles/playRoom.js";

export function PlayRoom() {
    const colors: CardColor[] = ['diamonds', 'hearts', 'spades', 'clubs']

    const [holderCards, setHolderCards] = useState<CardType[]>(['diamonds', 'hearts', 'spades', 'clubs'].map((_item, index) => {
        const number = Math.round(Math.random() * 10);
        return {
            key: colors[index] + number,
            color: colors[index],
            number,
            showFace: 'front',
            holder: 'bbb169',
            statu: 'distributed'
        }
    }));

    return <div css={palyRoomPageCss}>
        <div css={palyGroundCss} key='playGround'>
            {
                holderCards.map((e) => {
                    return <div key={e.color + e.number}>
                        <Card {...e} />
                    </div>
                })
            }
        </div>
        <FootHolder cards={holderCards} setCards={setHolderCards} key='footHolder'/>
    </div>
}