import { FootHolder } from "./component/footHolder/index.js";
import { css, jsx } from '@emotion/react';
import { CardColor, CardType } from "./type.js";
import { useState } from "react";
import Card from "@/component/card/index.js";

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

    return <div css={css`
        width: 100%;
        height: 100%;
        position: relative;
        background-color: 
    `}>
        <div css={css`
            height: 100%;
            width: 100%;
            background: radial-gradient(circle, #07b707 10%, black 90%);
            padding-bottom: 20%;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
        `} key='playGround'>
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