import Card from '@/component/card/index.js';
import { infoContext } from '@/utils/infoContext.js';
import { useContext } from 'react';

export function PublicCards () {
    const { room } = useContext(infoContext);

    if (!room?.publicCards) {
        return <></>;
    }

    return <>
        {
            room?.publicCards?.map((e) => {
                return <Card {...e} />;
            })
        }
    </>;
}