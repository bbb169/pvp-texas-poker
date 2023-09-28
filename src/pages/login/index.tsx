import { Button, Input } from 'antd';
import { LoginBox, LoginPage } from './styles/index.js';
import { css, jsx } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const marginBottom16 = css`
  margin: 20px 0;
  flex: 1;
`;

const Login = () => {
  const navigate = useNavigate()

  return (
    <LoginPage>
      <LoginBox>
        <h2>进入房间</h2>
        <div css={css`
            flex: 1;
            display: flex;
            flex-direction: column;
          `}>
            <Input placeholder="输入名称" css={marginBottom16} />
            <Input placeholder="输入房间号" css={marginBottom16} />
            <Button type="primary" block css={marginBottom16} onClick={() =>{
              navigate('/playRoom')
            }}>
                Login
            </Button>
        </div>
      </LoginBox>
    </LoginPage>
  );
};

export default Login;