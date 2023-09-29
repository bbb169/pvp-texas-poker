import { FootHolder } from "./component/footHolder/index.js";
import { CardColor, CardType } from "./type.js";
import { useState } from "react";
import Card from "@/component/card/index.js";
import { palyGroundCss, palyRoomPageCss } from "./styles/playRoom.js";
import { Button } from "antd";
import { privateKey } from "@/const.js";
import { AES } from "crypto-js";

export function PlayRoom() {
    const colors: CardColor[] = ['diamonds', 'hearts', 'spades', 'clubs']

    const [holderCards, setHolderCards] = useState<CardType[]>(['diamonds', 'hearts', 'spades', 'clubs'].map((_item, index) => {
        const number = Math.round(Math.random() * 10);
        return {
            key: AES.encrypt(colors[index] + number, privateKey).toString(),
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
            <Button 
            key={'button'}
            type='primary'
            onClick={() => {
                setHolderCards(holderCards.map(item => {
                    return {
                        ...item,
                        showFace: item.showFace === 'back' ? 'front' : 'back'
                    }
                }))
            }}>turn face</Button>
        </div>
        <FootHolder cards={holderCards} setCards={setHolderCards} key='footHolder'/>
    </div>
}