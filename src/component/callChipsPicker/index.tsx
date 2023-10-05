import { callChips } from "@/pages/playRoom/api.js";
import { PlayerInfoType } from "@/pages/playRoom/type.js";
import { DollarOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import { Button, Space } from "antd";
import { SliderChipsPicker } from "./sliderChipsPicker.js";

const basicCallCents = [5,10,20];

export function CallChipsPicker({ player } : { player: PlayerInfoType }) {
  return <div css={css`
    position: absolute;
    top: -100px
  `}>
    <Space>
      {
        basicCallCents.map(item => {
          const isEffectCall = item<=player.holdCent;

          return isEffectCall && <Button type="primary" shape="round" key={item} onClick={() => callChips(player, item)}>
            + {item}
          </Button>
        })
      }
      <SliderChipsPicker player={player}/>
      <Button type="primary" shape="round" danger onClick={() => callChips(player, player.holdCent)}>
        All in
      </Button>
      {/* ================ Current Chip Holding ================ */}
      <Button icon={<DollarOutlined />} type="primary" shape="round">Current Chip Holding: {player.holdCent}</Button>
    </Space>
  </div>
}