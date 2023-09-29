import Card from '@/component/card/index.js';
import DragableItem from '@/component/dragableItem/index.js';
import { css } from '@emotion/react';
import { CardType } from '../../type.js';

export function FootHolder({ cards, setCards } : { cards: Array<CardType>, setCards: (datas: (datas: CardType[]) => CardType[]) => void }) {
    return <div css={css`
        position: absolute;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 20%;
        background: linear-gradient(to bottom right, #00ccff, #ff0000);
    `}>
        {
            <DragableItem 
                dataSource={cards} 
                setDataSource={setCards} 
                renderFunc={(e) => <Card {...e as CardType} />}
            />
        }
    </div>
}