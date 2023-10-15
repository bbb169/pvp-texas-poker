import Card from '@/component/card/index.js';
import DragableItem from '@/component/dragableItem/index.js';
import { css } from '@emotion/react';
import { CardsFlexBoxDiv } from '../../styles/playRoom.js';
import { CardType } from '../../type.js';

export default function DemoCards ({ cards } : { cards: CardType[] }) {
    return <CardsFlexBoxDiv>
        {
            <DragableItem 
                cssProp={css`width: 20%;`}
                dataSource={cards} 
                setDataSource={() => {}} 
                renderFunc={(e) => <Card {...e as CardType} />}
            />
        }
    </CardsFlexBoxDiv>;
}