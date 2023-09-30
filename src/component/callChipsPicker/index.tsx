import { css } from "@emotion/react";
import { Button, Slider, Space, Tooltip } from "antd";

export function CallChipsPicker() {
  return <div css={css`
    position: absolute;
    top: -100px
  `}>
    <Space>
      <Button type="primary" shape="round" danger>
        + 5
      </Button>
      <Button type="primary" shape="round" danger>
        + 10
      </Button>
      <Button type="primary" shape="round" danger>
        + 20
      </Button>
      <Tooltip title={<Slider defaultValue={30} css={css`
        width: 100px;
      `}/>} trigger={'click'}>
        <Button type="primary" shape="round" danger>
          call by slider
        </Button>
      </Tooltip>
      <Button type="primary" shape="round" danger>
        All in
      </Button>
    </Space>
  </div>
}