import { translateStringToCard } from '@/utils/tanslate.js';
import { css } from '@emotion/react';
import { Tabs } from 'antd';
import { useState } from 'react';
import { CardType } from '../../type.js';
import DemoCards from '../demoCards/index.js';
import styled from '@emotion/styled';
import { customScrollBar } from '@/styles/scrollbar.js';

const getCards = (isShortCards = false): [string, CardType[]][] => {
    const diffCardsStr: [string, string[]][] = [
        ['葫芦', ['Ah', 'As', 'Ac', 'Ks', 'Kh']], 
        ['同花', ['2s', '4s', '6s', '9s', 'Qs']],
    ];

    const finalCardStr: [string, string[]][] = [
        ['同花顺', ['As', 'Ks', 'Qs', 'Js', '10s']], 
        ['四条（金刚）', ['Ah', 'As', 'Ac', 'Ad', '10s']], 
        ...(isShortCards ? diffCardsStr.reverse() : diffCardsStr), 
        ['顺子', ['As', 'Kh', 'Qc', 'Jd', '10s']], 
        ['三条', ['As', 'Ad', 'Ah', 'Ks', 'Qh']], 
        ['两对', ['As', 'Ah', 'Kc', 'Qs', 'Qh']], 
        ['一对', ['As', 'Ah', 'Kc', 'Js', 'Qh']], 
        ['高牌', ['As', 'Kh', 'Qc', 'Jd', '4s']], 
    ];


    return finalCardStr.map(([str, cardsStr]) => {
        return [str, cardsStr.map(str => translateStringToCard(str))];
    });
};

const CardsTypeBoxDiv = styled.div`
  max-height: 60vh;
  width: 80vw;
  overflow: auto;
  ${customScrollBar()}
`;


export default function CardsTypeCompareGuide () {
    const [activeTab, setActiveTab] = useState('1');
    const items = new Array(2).fill(null).map((_, i) => {
        return {
            label: i === 0 ? '长牌大小' : '短牌大小',
            key: `${i + 1}`,
            children: <CardsTypeBoxDiv>
                {
                    getCards(true).map(([name, cards]) => {
                        return <div key={name} css={css`
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        `}>
                            <div>{name}</div>
                            <DemoCards cards={cards}/>
                        </div>;
                    })
                }
            </CardsTypeBoxDiv>,
        };
    });

    return <Tabs activeKey={activeTab} items={items} onChange={(activeKey) => setActiveTab(activeKey)}>
    </Tabs>;
}