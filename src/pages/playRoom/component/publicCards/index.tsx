import Card from '@/component/card/index.js';
import DragableItem from '@/component/dragableItem/index.js';
import { infoContext } from '@/utils/infoContext.js';
import { css } from '@emotion/react';
import { useContext } from 'react';
import { CardsFlexBoxDiv } from '../../styles/playRoom.js';
import { CardType } from '../../type.js';

export function PublicCards () {
    const { room } = useContext(infoContext);

    if (!room?.publicCards?.length) {
        return <></>;
    }

    return <CardsFlexBoxDiv>
        {
            room?.publicCards && <DragableItem 
                cssProp={css`width: 20%;`}
                dataSource={room?.publicCards} 
                setDataSource={() => {}} 
                renderFunc={(e) => <Card {...e as CardType} />}
            />
        }
    </CardsFlexBoxDiv>;
}