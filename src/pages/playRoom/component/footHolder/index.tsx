import { CallChipsPicker } from '@/component/callChipsPicker/index.js';
import Card from '@/component/card/index.js';
import DragableItem from '@/component/dragableItem/index.js';
import { useEffect, useState } from 'react';
import { CardType, PlayerInfoType } from '../../type.js';
import { footHolderBlueBorderBox, footHolderBoxCss } from './style.js';

export default function FootHolder({ player } : { player: PlayerInfoType }) {
    const [holderCards, setHolderCards] = useState<CardType[] | undefined>(player.holdCards);

    useEffect(() => {
        setHolderCards(player.holdCards)
    }, [player])

    const isCalling = player.status === 'calling';

    return <div css={footHolderBlueBorderBox(isCalling)}>
        <div css={footHolderBoxCss}>
            {isCalling && <CallChipsPicker player={player}/>}
            {
                holderCards && <DragableItem 
                    dataSource={holderCards} 
                    setDataSource={setHolderCards as React.Dispatch<React.SetStateAction<CardType[]>>} 
                    renderFunc={(e) => <Card {...e as CardType} />}
                />
            }
        </div>
    </div>
}