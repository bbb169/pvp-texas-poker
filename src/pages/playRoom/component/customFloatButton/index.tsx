import { Button, Popconfirm } from 'antd';
import { LeftOutlined, QuestionOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import CardsTypeCompareGuide from '../cardsTypeCompareGuide/index.js';
import introJs from 'intro.js';
import 'intro.js/introjs.css';
import { getFloatCss } from '../../styles/playRoom.js';
// import AudioButton from '../audioButton/index.js';

const Introduct = introJs as unknown as () => { start: () => void };

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
                Introduct().start();
            }}
        >
            <Button 
                css={getFloatCss(true)} 
                icon={<QuestionOutlined />}
                type='primary'
                shape='circle'
            />
        </Popconfirm>
        {/* <AudioButton /> */}
    </>;
}