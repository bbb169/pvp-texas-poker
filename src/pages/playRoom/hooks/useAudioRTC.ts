import { emitSocket } from '@/utils/api.js';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import RecordRTC, { RecordRTCPromisesHandler } from 'recordrtc';
import { Socket } from 'socket.io-client';
export interface AudioInfo { 
    userName: string,
    blob: ArrayBuffer,
 }

/** use RTC to audio communicate */
export default function useAudioRTC (socket: Socket | void, startRecord = false, setStartRecord: (value: boolean) => void): [AudioInfo] {
    const [recorder, setRecorder] = useState<RecordRTC.RecordRTCPromisesHandler>();
    const [buffer, setBuffer] = useState<AudioInfo>();

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.on('serverSendAudioBlob', (buffer: { 
            userName: string,
            blob: ArrayBuffer,
         }) => {
            setBuffer(buffer);
        });

        // Get user media
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(async (stream) => {
                // emitSocket('sendStream', stream);
                const getRecorder = new RecordRTCPromisesHandler(stream, { type: 'audio' });
                setRecorder(getRecorder);
            })
            .catch((error) => {
                console.error('Error accessing user media:', error);
            });
    }, [socket]);

    // controll start and stop record
    useEffect(() => {
        if (!startRecord) {
            recorder?.getState().then(state => {
                if (state === 'recording') {
                    stopAndSendRecorderBlob();
                }
            });
        } else {
            recorder?.getState().then(state => {
                if (state !== 'recording') {
                    recorder.startRecording();
                    // max time limit is ten seconds
                    setTimeout(() => {
                        recorder?.getState().then(state => {
                            if (state === 'recording') {
                                message.info('最长语音为10秒');
                                setStartRecord(false);
                            }
                        });
                    }, 10000);
                }
            });
        }
    }, [startRecord]);

    async function stopAndSendRecorderBlob () {
        if (!recorder) {
            return;
        }

        recorder.stopRecording().then(() => {
            recorder.getBlob().then((blob) => {
                emitSocket('clientSendAudioBlob', blob);
            });
        });
    }

    return [buffer];
}