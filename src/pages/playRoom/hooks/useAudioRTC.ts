import { emitSocket } from '@/utils/api.js';
import { useEffect, useState } from 'react';
import RecordRTC, { RecordRTCPromisesHandler } from 'recordrtc';
import { Socket } from 'socket.io-client';

/** use RTC to audio communicate */
export default function useAudioRTC (socket: Socket | undefined, startRecord = false) {
    const [recorder, setRecorder] = useState<RecordRTC.RecordRTCPromisesHandler>();
    const [buffer, setBuffer] = useState<ArrayBuffer>();

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.on('serverSendAudioBlob', (buffer) => {
            setBuffer(buffer);
        });

        // Get user media
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(async (stream) => {
                // emitSocket('sendStream', stream);
                const getRecorder = new RecordRTCPromisesHandler(stream, { type: 'audio' });
                setRecorder(getRecorder);

                // max time limit is ten seconds
                setTimeout(() => {
                    stopAndSendRecorderBlob();
                }, 10000);
            })
            .catch((error) => {
                console.error('Error accessing user media:', error);
            });
    }, [socket]);

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