import { callChips } from "@/pages/playRoom/api.js";
import { infoContext } from "@/utils/infoContext.js";
import { DollarOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import { Button, Space } from "antd";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { SliderChipsPicker } from "./sliderChipsPicker.js";

const basicCallCents = [0,5,10,20];

export function CallChipsPicker() {
  const { player, room } = useContext(infoContext);
  const { roomId, userName } = useParams();
  const callChipsDirec = (callingChips?: number) => {
    if (roomId && userName) {
      callChips(roomId, userName,callingChips)
    }
  }

  if (!player || !room) {
    return <></>
  }

  return <div css={css`
    position: absolute;
    top: -100px
  `}>
    {room && room.statu !== 'waiting' && <Button icon={<DollarOutlined />} type="primary" shape="round">Minimum Callable Chips:{room?.currentCallChips || 0}</Button>}
    <Space>
      {
        basicCallCents.map(item => {
          const isEffectCall = item<=player.holdCent && item + player.calledChips >= room.currentCallChips;

          return isEffectCall && <Button type="primary" shape="round" key={item} onClick={() => callChipsDirec(item)}>
            +{item}
          </Button>
        })
      }
      <SliderChipsPicker player={player}/>
      <Button type="primary" shape="round" danger onClick={() => callChipsDirec(player.holdCent)}>
        All in
      </Button>
      <Button type="primary" shape="round" danger onClick={callChipsDirec}>
        Fold
      </Button>
      {/* ================ Chips Account ================ */}
      <Button icon={<DollarOutlined />} type="primary" shape="round">Holding:{player.holdCent}</Button>
      <Button icon={<DollarOutlined />} type="primary" shape="round">Betted: {player.calledChips}</Button>
    </Space>
  </div>
}