
import { Button, Tooltip } from 'antd';
import { AudioMutedOutlined, AudioOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { getFloatCss } from '../../styles/playRoom.js';
import useAudioRTC, { AudioInfo } from '../../hooks/useAudioRTC.js';
import { infoContext } from '@/utils/infoContext.js';
import { isEmpty } from '@/utils/index.js';
import { usePlayerAudioInfo } from '../../store/playerInfo.js';


export default function AudioButton () {
    const [startRecord, setStartRecord] = useState(false);
    const { socket } = useContext(infoContext);
    const [newBuffer] = useAudioRTC(socket, startRecord, setStartRecord);
    const [renderBuffer, setRenderBuffer] = useState<{ buffer: AudioInfo, key: number }[]>([]);
    const [blobKey, setBlobKey] = useState<number>(0);
    const { addPlayingPlayer, deletePlayingPlayer } = usePlayerAudioInfo((state) => state);
    
    useEffect(() => {
        if (newBuffer) {
            setRenderBuffer([...renderBuffer, { buffer: newBuffer, key: blobKey }]);
            addPlayingPlayer(newBuffer.userName);
            setBlobKey(pre => pre + 1);
        }
    }, [newBuffer]);
  
    return <>
        <Tooltip title='点击进行全房喊麦~'>
            <Button 
                css={getFloatCss(false, 1)} 
                icon={!startRecord ? <AudioMutedOutlined /> : <AudioOutlined />}
                type='primary'
                danger={startRecord}
                disabled={isEmpty(socket)}
                shape='circle' 
                onClick={() => {
                    setStartRecord(pre => !pre);
                }}
                data-intro="点击进行全房喊麦~"
            />
            {renderBuffer.map(item => {
                return <audio key={item.key} autoPlay src={URL.createObjectURL(new Blob([new Int8Array(item.buffer.blob)]))} onEnded={() => { 
                    renderBuffer.splice(renderBuffer.findIndex(value => value === item), 1);
                    deletePlayingPlayer(item.buffer.userName);
                    setRenderBuffer([...renderBuffer]);
                }}></audio>;
            })}
        </Tooltip>
    </>;
}