import { Badge, Button, Popconfirm } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import 'intro.js/introjs.css';
import { getFloatCss } from '../../styles/playRoom.js';
import ChatRoom from '@/component/chatRoom/index.js';
import { useChatMessageStore } from '../../store/chatMessage.js';
import { useState } from 'react';

export default function TalkRommButton () {
    const { chatMessage: { unReadNum }, readMsg } = useChatMessageStore();
    const [open, setOpen] = useState(false);

    return <>
        <Popconfirm
            title="聊天室"
            description={<ChatRoom/>}
            okText="关闭"
            showCancel={false}
            placement='bottomLeft'
            icon={<></>}
            open={open}
            onOpenChange={() => {
                setOpen(pre => !pre);
                readMsg();
            }}
        >
            <Badge css={getFloatCss(true, 1)} count={open ? 0 : unReadNum}>
                <Button 
                    icon={<CommentOutlined />}
                    type='primary'
                    shape='circle'
                    data-intro="此处为聊天室"
                />
            </Badge>
        </Popconfirm>
    </>;
}