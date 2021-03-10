import React, {useRef, useEffect} from 'react'
import io from 'scoket.io-client'

const Room = (props) => {
    
    const userAudio = useRef()
    const otherAudio = useRef()
    const peerRef = useRef()
    const socketRef = useRef()
    const otherUser = useRef()
    const userStream = useRef()
    
    useEffect(() =>{
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
        })

    }, [])
    
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

        
    }

    


    return (
        <div>
            <h1>Room</h1>
            <div className="container">
                <div className="speakers">
                    <audio ref={userAudio} />
                    <audio ref={otherAudio} />
                </div>
            </div>
        </div>
    )
}

export default Room;