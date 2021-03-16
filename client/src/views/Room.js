import React, {useRef, useEffect} from 'react'
import io from 'socket.io-client'
import './Room.css'

const Room = (props) => {
    
    const userAudio = useRef()
    const otherAudio = useRef()
    const peerRef = useRef()
    const socketRef = useRef()
    const otherUser = useRef()
    const userStream = useRef()
    
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true}).then(stream => {
            userAudio.current.srcObject = stream
            userStream.current = stream

            socketRef.current = io.connect('/')
            socketRef.current.emit('join', props.match.params.roomId)

            socketRef.current.on('other', userId => {
                callUser(userId)
                otherUser.current = userId
            })

            socketRef.current.on('joined', userId => {
                otherUser.current = userId
            })

            socketRef.current.on('request', handleRequest)
            socketRef.current.on('accept', handleAccept)

            socketRef.current.on("ice-candidate", handleNewICECandidateMsg)
        })

    }, [])

    function callUser(userId) {
        peerRef.current = createPeer(userId);
        userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current));
    }
    
    function createPeer(userId) {
        const peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: 'stun:stun.stunprotocol.org'
                },
                {
                    urls: 'turn:numb.viagenie.ca',
                    credential: 'muazkh',
                    username: 'webrtc@live.com'
                }
            ]
        })

        peer.onicecandidate = handleICECandidateEvent
        peer.ontrack = handleTrackEvent
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userId)

        return peer

    }

    function handleNegotiationNeededEvent(userId) {
        peerRef.current.createOffer().then(offer => {
            return peerRef.current.setLocalDescription(offer);
        }).then(() => {
            const payload = {
                target: userId,
                caller: socketRef.current.id,
                sdp: peerRef.current.localDescription
            };
            socketRef.current.emit("request", payload);
        }).catch(e => console.log(e));
    }

    function handleRequest(incoming) {
        peerRef.current = createPeer();
        const desc = new RTCSessionDescription(incoming.sdp);
        peerRef.current.setRemoteDescription(desc).then(() => {
            userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current));
        }).then(() => {
            return peerRef.current.createAccept();
        }).then(accept => {
            return peerRef.current.setLocalDescription(accept);
        }).then(() => {
            const payload = {
                target: incoming.caller,
                caller: socketRef.current.id,
                sdp: peerRef.current.localDescription
            }
            socketRef.current.emit("accept", payload);
        })
    }

    function handleAccept(message) {
        const desc = new RTCSessionDescription(message.sdp);
        peerRef.current.setRemoteDescription(desc).catch(e => console.log(e));
    }

    function handleICECandidateEvent(e) {
        if (e.candidate) {
            const payload = {
                target: otherUser.current,
                candidate: e.candidate,
            }
            socketRef.current.emit("ice-candidate", payload);
        }
    }

    function handleNewICECandidateMsg(incoming) {
        const candidate = new RTCIceCandidate(incoming);

        peerRef.current.addIceCandidate(candidate)
            .catch(e => console.log(e));
    }

    function handleTrackEvent(e) {
        otherAudio.current.srcObject = e.streams[0];
    };
    


    return (
        <div>
            <h1>Room</h1>
            <div className="container">
                <div className="speakers">
                    <div className='speakers-you'>
                        <audio autoPlay ref={userAudio} />
                    </div>
                    <div className="speakers-other">
                        <audio autoPlay ref={otherAudio} />
                    </div>
                    
                </div>
                <div className="listeners">
                    <h3>Listeners</h3>
                </div>
            </div>
        </div>
    )
    }

export default Room;