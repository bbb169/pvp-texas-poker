import { Button, Input } from 'antd';
import { LoginBox, LoginPage } from './styles/index.js';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const marginBottom16 = css`
  margin: 20px 0;
  flex: 1;
`;

const Login = () => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState('');
    const [userName, setUserRoom] = useState('');

    return (
        <LoginPage>
            <LoginBox>
                <h2>进入房间</h2>
                <div css={css`
            flex: 1;
            display: flex;
            flex-direction: column;
          `}>
                    <Input value={userName} placeholder="输入名称" css={marginBottom16} onChange={(evt) => {
                        setUserRoom(evt.target.value);
                    }}/>
                    <Input value={roomId} placeholder="输入房间号" css={marginBottom16} onChange={(evt) => {
                        setRoomId(evt.target.value);
                    }}/>
                    <Button type="primary" block css={marginBottom16} onClick={() => {
                        navigate(`/playRoom/${roomId}/${userName}`);
                    }}>
                Login
                    </Button>
                </div>
            </LoginBox>
        </LoginPage>
    );
};

export default Login;