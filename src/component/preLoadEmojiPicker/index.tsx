import { css } from '@emotion/react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import React, { useEffect, useState } from 'react';
const TypedPicker = Picker as unknown as (props: any) => React.JSX.Element;

export default function PreLoadEmojiPicker () {
    const [loadPicker, setLoadPicker] = useState(true);

    useEffect(() => {
        setLoadPicker(false);
    }, []);

    return loadPicker ? <div css={css`
      position: absolute;
      visibility: hidden;
    `}><TypedPicker 
        locale='zh'
        categories='people' 
        data={data}
        previewPosition='none'
        perLine={5}
        searchPosition='none'/></div> : <></>;
}