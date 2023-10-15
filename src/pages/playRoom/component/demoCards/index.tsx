import Card from '@/component/card/index.js';
import DragableItem from '@/component/dragableItem/index.js';
import { css } from '@emotion/react';
import React from 'react';
import { CardsFlexBoxDiv } from '../../styles/playRoom.js';
import { CardType } from '../../type.js';

export default function DemoCards ({ cards, ...restProps } : { 
    cards: CardType[]; 
    restProps?: React.HTMLAttributes<HTMLDivElement>;
}) {
    return <CardsFlexBoxDiv {...restProps}>
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