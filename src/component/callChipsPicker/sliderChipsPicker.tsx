import { callChips } from "@/pages/playRoom/api.js";
import { PlayerInfoType } from "@/pages/playRoom/type.js";
import { css } from "@emotion/react";
import { Button, Slider, Tooltip } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";

export function SliderChipsPicker({ player, minCallableChips } : { player: PlayerInfoType, minCallableChips: number }) {
  const [callingChips, setCallingChips] = useState(0);
  const { roomId, userName } = useParams();
  const callChipsDirec = () => {
    if (roomId && userName) {
      callChips(callingChips)
    }
  }

  return <>
    <Tooltip title={
      // ========== popup =================
      <div css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 8px 4px;
      `}>
        <Slider css={css`
          width: 100px;
        `} value={callingChips} min={minCallableChips}  max={player.holdCent} onChange={(value: number) => setCallingChips(value)}/>
        <Button type="primary" shape="round" onClick={() => {         
          callChipsDirec() 
        }} danger={callingChips === player.holdCent}>
          confirm
        </Button>
      </div>
      // ========== popup =================
    } trigger={'click'}>
      <Button type="primary" shape="round">
        call by slider
      </Button>
    </Tooltip>
  </>
}