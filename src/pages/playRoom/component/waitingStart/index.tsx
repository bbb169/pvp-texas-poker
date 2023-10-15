import { Button, Space } from 'antd';
import { startGame } from '../../api.js';

export default function WaitingStart ({ isButtonPosition, hasOtherPlayers }: { isButtonPosition: boolean, hasOtherPlayers: number }) {
    return isButtonPosition && hasOtherPlayers
        ? <Space data-intro="选择要进行的游戏的规则">
            <Button type="primary" shape="round" danger onClick={() => {
                startGame(true);
            }}>选择短牌进行游戏</Button>
            <Button type="primary" shape="round" onClick={() => {
                startGame();
            }}>选择长牌进行游戏</Button>
        </Space>
        :    <Button type="primary">{!isButtonPosition ? '请等待庄家开始游戏' : '请等待其它玩家加入'}</Button>;
}