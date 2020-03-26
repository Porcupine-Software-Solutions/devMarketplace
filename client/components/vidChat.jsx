import React, { Component, useEffect } from 'react';
import { render } from 'react-dom';

const VidChat = (props) => {
    useEffect(async () => {
        const myVideo = document.getElementById("my-video");
        const peerVideo = document.getElementById("peer-video");
        
        const mediaStream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
        myVideo.srcObject = mediaStream;
    
        const peer = new Peer({key: 'lwjd5qra8257b9'})
        let localPeerId;
        let remotePeerId;
        
        
        // Get Local PeerID from PeerJs server and Emit to App Server
        peer.on('open', id => {
            socket.emit("localPeerId", id);
            localPeerId = id;
        });
        
        // Recieve Remote PeerID from App Server
        socket.on("remotePeerId", id => {
            remotePeerId = id;
        });
        
        // Listen for Call from Remote Peer
        peer.on("call", (call) => {
            call.answer(mediaStream);
        });
        
        // Call Remote Peer
        const call = peer.call(peerId, mediaStream);
        // Listen for the Stream Event (emitted from call event)
        call.on('stream', (stream) => {
            peerVideo.srcObject = stream;
        });
    }
    ,[])

    return (
            <div>
                <video id="my-video" width="300" autoPlay="autoplay" ></video>
                <video id="peer-video" width="300" autoPlay="autoplay" ></video>
            </div>
    )
}


export default VidChat;