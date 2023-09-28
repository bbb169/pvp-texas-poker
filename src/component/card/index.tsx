import React from 'react';
import { css, jsx, keyframes } from '@emotion/react';
import { CardType } from '@/pages/playRoom/type.js';
import { cardBack, cardContainer, cardFront } from './css.js';
import { CSSTransition } from 'react-transition-group';
import { CardFront } from './cardFront.js';


const Card = (card: CardType): JSX.Element => {
  const { color, showFace, number } = card;

  return (
    <>
      <div css={cardContainer(showFace === 'back')}>
          <div css={cardBack}></div>
      </div>
      <div css={cardContainer(showFace === 'front')}>
        <div css={cardFront}>
          { showFace === 'front' && <CardFront {...card}/>}
        </div>
      </div>
    </>
  );
};

export default Card;