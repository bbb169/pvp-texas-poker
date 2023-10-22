import { useChatMessageStore } from '@/pages/playRoom/store/chatMessage.js';
import { customScrollBar } from '@/styles/scrollbar.js';
import { emitSocket } from '@/utils/api.js';
import { infoContext } from '@/utils/infoContext.js';
import { SendOutlined, SmileOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Button, Input, Popconfirm, Tooltip } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import PlayerAvatar from '../playerAvatar/index.js';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
const TypedPicker = Picker as unknown as (props: any) => React.JSX.Element;

const chatContainerStyle = css`
  width: 50vw;
  margin: 0 auto;
  ${customScrollBar()}
`;

const scrollMessageBox = css`
  width: 100%;
  max-height: 30vh;
  min-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0 auto;
  background-color: rgb(246,248,250);
  ${customScrollBar()}
`;

const chatBubbleBoxStyle = (isUser = false) => css`
    width: 100%;
    color: #fff;
    padding: 4px 8px;
    border-radius: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: ${isUser ? 'flex-end;' : 'flex-start;'}
`;

const chatBubbleStyle = (isUser = false) => css`
  background-color: ${isUser ? '#69c0ff' : '#87e8de'};
  color: #fff;
  padding: 4px 8px;
  border-radius: 10px;
  margin: 5px;
  max-width: 70%;
`;

export default function ChatRoom (): React.JSX.Element {
    const listRef = useRef<HTMLDivElement>(null);
    const [message, setMessage] = useState<string>('');
    const { chatMessage: { info: messages } } = useChatMessageStore();
    const { player } = useContext(infoContext);

    useEffect(() => {
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
    }, [messages]);

    const handleSendMessage = () => {
        if (message?.toString().trim() === '') return;
        emitSocket('sendMessage', { player, msg: message });
        setMessage('');
    };

    return (
        <div css={chatContainerStyle}>
            <div
                ref={listRef}
                css={scrollMessageBox}
            >
                {
                    messages.map(({ player: curPlayer, msg, key }) => {
                        const isMe = curPlayer.name === player?.name;

                        return <div css={chatBubbleBoxStyle(isMe)} key={key}>
                            {!isMe && <Tooltip title={curPlayer.name}><PlayerAvatar player={curPlayer}/></Tooltip>}
                            <span 
                                css={chatBubbleStyle(isMe)}
                                dangerouslySetInnerHTML={{ __html: msg.replace(/<[^>]+>(.*?)<\/[^>]+>/g, '').replace(/\[([a-zA-Z0-9_\-]+)\]/g, '<em-emoji id="$1"></em-emoji>') }}>
                            </span>
                            {isMe && <Tooltip title={curPlayer.name}><PlayerAvatar player={curPlayer}/></Tooltip>}
                        </div>;  
                    })
                }
            </div>
            <Input
                css={css`
                    width: 100%;
                    position: relative;
                `}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onPressEnter={handleSendMessage}
                suffix={
                    <>
                        <Popconfirm
                            title='表情包'
                            icon={<></>}
                            description={
                                <div
                                    css={css`
                                        > div > em-emoji-picker {
                                            max-height: 200px;
                                        }
                                    `}>
                                    <TypedPicker 
                                        className='asda'
                                        locale='zh'
                                        categories='people' 
                                        data={data} onEmojiSelect={(icon: any) => {
                                            setMessage(`${message}[${icon.id}]`);
                                        }} 
                                        previewPosition='none'
                                        perLine={5}
                                        searchPosition='none'
                                    />
                                </div>    
                            }
                            placement='bottomRight'
                            showCancel={false}
                        >
                            <Button type='primary' shape='circle' icon={
                                <SmileOutlined/>} />
                        </Popconfirm>
                        <Button type="primary" shape='circle' onClick={handleSendMessage} icon={<SendOutlined />} />
                    </>
                }
            />
        </div>
    );
}