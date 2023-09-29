import { CardType } from '@/pages/playRoom/type.js';
import { cardBack, cardContainer, cardFront } from './styles/cardContainer.js';
import { CardFront } from './cardFront.js';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { css } from '@emotion/react';


const Card = (card: CardType): JSX.Element => {
  const { showFace } = card;
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const [renderContent, setRenderContent] = useState<JSX.Element>(<></>);

  useEffect(() => {
    const renderShowFace = (front = false, back = false, clearFront = false ) => {
      return (<>
        {<div ref={frontRef} css={cardContainer(back)} key='cardBack'>
          <div css={cardBack}></div>
        </div>}
        {<div ref={backRef} css={cardContainer(front)} key='cardFront'>
          <div css={cardFront}>
            {/* to avoid user seeing in devTools */}
            {!clearFront && <CardFront {...card}/>}
          </div>
        </div>}
      </>)
    }

    if (showFace === 'back') {
      // make card fade out
      setRenderContent(renderShowFace(false, false));
      // render new card showing face after animation finishing
      setTimeout(() => {
        setRenderContent(renderShowFace(false, true, true))
      }, 500);
    } else {
      setRenderContent(renderShowFace(false, false));
      setTimeout(() => {
        setRenderContent(renderShowFace(true, false, false))
      }, 500);
    }
  }, [showFace])

  return (
    <div css={css`
      position: relative;
      width: 100px;
      height: 150px;
      margin: 0 20px;
    `}>
      {renderContent}
    </div>
  );
};

export default Card;