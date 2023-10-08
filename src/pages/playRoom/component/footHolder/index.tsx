import { CallChipsPicker } from '@/component/callChipsPicker/index.js';
import Card from '@/component/card/index.js';
import DragableItem from '@/component/dragableItem/index.js';
import { infoContext } from '@/utils/infoContext.js';
import { useContext, useEffect, useState } from 'react';
import { CardType } from '../../type.js';
import { footHolderBlueBorderBox, footHolderBoxCss } from './style.js';

export default function FootHolder() {
    const { player, room } = useContext(infoContext);
    const [holderCards, setHolderCards] = useState<CardType[] | undefined>(player?.holdCards);

    useEffect(() => {
        setHolderCards(player?.holdCards)
    }, [player])

    if (!player || !room) {
        return <></>
    }

    const isCalling = player.status === 'calling';

    return <div css={footHolderBlueBorderBox(isCalling)}>
        <div css={footHolderBoxCss}>
            {isCalling && <CallChipsPicker />}
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