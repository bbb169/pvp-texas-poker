import Card from '@/component/card/index.js';
import { infoContext } from '@/utils/infoContext.js';
import { useContext } from 'react';
import { CardsFlexBoxDiv } from '../../styles/playRoom.js';

export function PublicCards () {
    const { room } = useContext(infoContext);

    if (!room?.publicCards?.length) {
        return <></>;
    }

    return <CardsFlexBoxDiv>
        {
            room?.publicCards?.map((e) => {
                return <Card {...e} key={e.key}/>;
            })
        }
    </CardsFlexBoxDiv>;
}