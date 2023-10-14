import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';


export function CustomFloatButton () {
    const navigate = useNavigate();
    
    return <Button 
        css={css`
          position: absolute;
          top: 2vh;
          left: 4vw;
          z-index: 999;
        `} icon={<LeftOutlined />}
        type='primary'
        danger
        shape='circle' 
        onClick={() => {
            navigate('/');
        }}/>;
}