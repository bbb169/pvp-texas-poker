import { Button, Space } from 'antd';
import { startGame } from '../../api.js';

export default function WaitingStart ({ isButtonPosition, hasOtherPlayers }: { isButtonPosition: boolean, hasOtherPlayers: number }) {
    return isButtonPosition && hasOtherPlayers
        ? <Space>
            <Button type="primary" shape="round" danger onClick={() => {
                startGame(true);
            }}>Play short cards</Button>
            <Button type="primary" shape="round" onClick={() => {
                startGame();
            }}>Play long cards</Button>
        </Space>
        :    <Button type="primary">Waiting For Starting Game</Button>;
}