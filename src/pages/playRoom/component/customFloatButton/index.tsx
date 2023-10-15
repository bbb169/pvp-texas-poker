import { Button, Popconfirm, Tooltip } from 'antd';
import { LeftOutlined, QuestionOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import CardsTypeCompareGuide from '../cardsTypeCompareGuide/index.js';

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
            }}/>
        <Popconfirm
            title="规则"
            description={<CardsTypeCompareGuide/>}
            okText="Yes"
            cancelText="No"
        >
            <Tooltip title='了解更多' placement='left'><Button 
                css={getFloatCss(true)} icon={<QuestionOutlined />}
                type='primary'
                shape='circle'/></Tooltip>
        </Popconfirm>
        
    </>;
}