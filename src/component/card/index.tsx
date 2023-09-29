import { CardType } from '@/pages/playRoom/type.js';
import { cardBack, cardContainer, cardFront } from './styles/cardContainer.js';
import { CardFront } from './cardFront.js';


const Card = (card: CardType): JSX.Element => {
  const { showFace } = card;

  return (
    <>
      <div css={cardContainer(showFace === 'back')} key='cardBack'>
          <div css={cardBack}></div>
      </div>
      <div css={cardContainer(showFace === 'front')} key='cardFront'>
        <div css={cardFront}>
          { showFace === 'front' && <CardFront {...card}/>}
        </div>
      </div>
    </>
  );
};

export default Card;