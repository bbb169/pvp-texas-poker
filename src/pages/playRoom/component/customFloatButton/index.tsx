import { Button, Popconfirm } from 'antd';
import { LeftOutlined, QuestionOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import CardsTypeCompareGuide from '../cardsTypeCompareGuide/index.js';
import * as introJs from 'intro.js';
import 'intro.js/introjs.css';

const getFloatCss = (isRight = false) => css`
  position: absolute;
  top: 2vh;
  ${isRight ? 'right' : 'left'}: 4vw;
  z-index: 999;
`;

export function CustomFloatButton () {
    const navigate = useNavigate();
    
    return <>
        <Button 
            css={getFloatCss()} icon={<LeftOutlined />}
            type='primary'
            danger
            shape='circle' 
            onClick={() => {
                navigate('/');
            }}
            data-intro="点击此处退出房间"
        />
        <Popconfirm
            title="规则"
            description={<CardsTypeCompareGuide/>}
            okText="想了解更多（功能引导）"
            cancelText="已了解"
            placement='bottomLeft'
            onConfirm={() => {
                introJs.default().start(); 
            }}
        >
            <Button 
                css={getFloatCss(true)} 
                icon={<QuestionOutlined />}
                type='primary'
                shape='circle'
            />
        </Popconfirm>
        
    </>;
}