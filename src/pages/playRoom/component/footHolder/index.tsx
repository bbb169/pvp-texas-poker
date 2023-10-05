import { CallChipsPicker } from '@/component/callChipsPicker/index.js';
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

    const isCalling = player.status === 'calling';

    return <div css={footHolderBlueBorderBox(isCalling)}>
        <div css={footHolderBoxCss}>
            {isCalling && <CallChipsPicker player={player}/>}
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