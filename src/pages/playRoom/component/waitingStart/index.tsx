import { Button } from "antd";

export default function WaitingStart({ isButtonPosition, hasOtherPlayers, onClick }: { isButtonPosition: boolean, hasOtherPlayers: number, onClick: () => void }) {
    return isButtonPosition && hasOtherPlayers ?
    <Button type="primary" shape="round" danger onClick={onClick}>Start Game</Button>
    :
    <Button type="primary">Waiting For Starting Game</Button>
}