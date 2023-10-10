import { callChips } from "@/pages/playRoom/api.js";
import { infoContext } from "@/utils/infoContext.js";
import { DollarOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import { Button, Space } from "antd";
import { useContext } from "react";
import { SliderChipsPicker } from "./sliderChipsPicker.js";

const basicCallCents = [0,5,10,20];

export function CallChipsPicker() {
  const { player, room } = useContext(infoContext);

  if (!player || !room) {
    return <></>
  }

  const minCallableChips = Math.max(room?.currentCallChips, player.blind, 0);

  return <Space css={css`
    position: absolute;
    top: -100px
  `} direction='vertical'>
    <Space>
      {
        basicCallCents.map(item => {
          const isEffectCall = item<=player.holdCent && item + player.calledChips >= minCallableChips;

          return isEffectCall && <Button type="primary" shape="round" key={item} onClick={() => callChips(item)}>
            +{item}
          </Button>
        })
      }
      <SliderChipsPicker player={player} minCallableChips={minCallableChips}/>
      <Button type="primary" shape="round" danger onClick={() => callChips(player.holdCent)}>
        All in
      </Button>
      <Button type="primary" shape="round" danger onClick={() => {
        callChips()
      }}>
        Fold
      </Button>
    </Space>
  </Space>
}