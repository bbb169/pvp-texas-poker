import Card from '@/component/card/index.js';
import DragableItem from '@/component/dragableItem/index.js';
import { useEffect, useState } from 'react';
import { CardType, PlayerInfoType } from '../../type.js';
import { footHolderBlueBorderBox, footHolderBoxCss } from './style.js';

export default function FootHolder({ player } : { player: PlayerInfoType }) {
    const [holderCards, setHolderCards] = useState<CardType[]>(player.holdCards as CardType[]);

    useEffect(() => {
        setHolderCards(player.holdCards as CardType[])
    }, [player])

    return <div css={footHolderBlueBorderBox(player.status === 'calling')}>
        <div css={footHolderBoxCss}>
            {
                <DragableItem 
                    dataSource={holderCards} 
                    setDataSource={setHolderCards} 
                    renderFunc={(e) => <Card {...e as CardType} />}
                />
            }
        </div>
    </div>
}