import { CardType } from '@/pages/playRoom/type.js';
import { cardBack, cardContainer, cardFront } from './styles/cardContainer.js';
import { CardFront } from './cardFront.js';
import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import * as React from 'react';


const Card = (card: CardType): React.JSX.Element => {
    const { showFace } = card;
    const frontRef = useRef<HTMLDivElement>(null);
    const backRef = useRef<HTMLDivElement>(null);

    const [renderContent, setRenderContent] = useState<React.JSX.Element>(<></>);
    const [lastShowFace, setLastShowFace] = useState(showFace);

    // To perfect the flip-flop animation
    useEffect(() => {
        const getIsNeedAnimation = () => {
            if (!lastShowFace || lastShowFace === showFace) {
                return false;
            }
            return true;
        };

        const isNeedAnimation = getIsNeedAnimation();

        const renderShowFace = (front = false, back = false, clearFront = false) => {
            return (<>
                {<div ref={frontRef} css={cardContainer(back, isNeedAnimation)} key='cardBack'>
                    <div css={cardBack}></div>
                </div>}
                {<div ref={backRef} css={cardContainer(front, isNeedAnimation)} key='cardFront'>
                    <div css={cardFront(!clearFront)}>
                        {/* to avoid user seeing in devTools */}
                        {!clearFront && <CardFront {...card}/>}
                    </div>
                </div>}
            </>);
        };

        // =============== don't need animation ==============
        if (!isNeedAnimation) {
            if (showFace === 'back') {
                setRenderContent(renderShowFace(false, true, true));
                setLastShowFace('back');
            } else {
                setRenderContent(renderShowFace(true, false, false));
                setLastShowFace('front');
            }
            return;
        }
    
        // =============== need animation ==============
        if (showFace === 'back') {
            // make card fade out
            setRenderContent(renderShowFace(false, false));
            // render new card showing face after animation finishing
            setTimeout(() => {
                setRenderContent(renderShowFace(false, true, true));
                setLastShowFace('back');
            }, 500);
        } else {
            setRenderContent(renderShowFace(false, false, true));
            setTimeout(() => {
                setRenderContent(renderShowFace(true, false, false));
                setLastShowFace('front');
            }, 500);
        }
    }, [card]);

    return (
        <div css={css`
            position: relative;
            width: 100px;
            height: 150px;
        `}>
            {renderContent}
        </div>
    );
};

export default Card;