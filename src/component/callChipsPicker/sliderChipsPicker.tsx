import { callChips } from "@/pages/playRoom/api.js";
import { PlayerInfoType } from "@/pages/playRoom/type.js";
import { css } from "@emotion/react";
import { Button, Slider, Tooltip } from "antd";
import { useState } from "react";

export function SliderChipsPicker({ player } : { player: PlayerInfoType }) {
  const [callingChips, setCallingChips] = useState(0);

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
        `} value={callingChips} max={player.holdCent} onChange={(value: number) => setCallingChips(value)}/>
        <Button type="primary" shape="round" onClick={() => { callChips(player, callingChips) }} danger={callingChips === player.holdCent}>
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