import React, {useRef, useEffect, useState} from 'react'
import io from 'socket.io-client'
import './Room.css'
import Peer from "simple-peer";
import styled from "styled-components";


const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
`;

const Video = styled.video`
  border: 1px solid blue;
  width: 50%;
  height: 50%;
`;

const Room = () => {
    
    const [yourID, setYourID] = useState("");
    const [users, setUsers] = useState({});
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);

    const userVideo = useRef();
    const partnerVideo = useRef();
    const socket = useRef();

    useEffect(() => {
        socket.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
        setStream(stream);
        if (userVideo.current) {
            userVideo.current.srcObject = stream;
        }
        })

        socket.current.on("yourID", (id) => {
        setYourID(id);
        })
        socket.current.on("allUsers", (users) => {
        setUsers(users);
        })

        socket.current.on("hey", (data) => {
        setReceivingCall(true);
        setCaller(data.from);
        setCallerSignal(data.signal);
        })
    }, []);

    function callPeer(id) {
        const peer = new Peer({
        initiator: true,
        trickle: false,
        config: {

            iceServers: [
                {
                    urls: "stun:numb.viagenie.ca",
                    username: "sultan1640@gmail.com",
                    credential: "98376683"
                },
                {
                    urls: "turn:numb.viagenie.ca",
                    username: "sultan1640@gmail.com",
                    credential: "98376683"
                }
            ]
        },
        stream: stream,
        });

        peer.on("signal", data => {
        socket.current.emit("callUser", { userToCall: id, signalData: data, from: yourID })
        })

        peer.on("stream", stream => {
        if (partnerVideo.current) {
            partnerVideo.current.srcObject = stream;
        }
        });

        socket.current.on("callAccepted", signal => {
        setCallAccepted(true);
        peer.signal(signal);
        })

    }

    function acceptCall() {
        setCallAccepted(true);
        const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: stream,
        });
        peer.on("signal", data => {
        socket.current.emit("acceptCall", { signal: data, to: caller })
        })

        peer.on("stream", stream => {
        partnerVideo.current.srcObject = stream;
        });

        peer.signal(callerSignal);
    }

    let UserVideo;
    if (stream) {
        UserVideo = (
        <Video playsInline muted ref={userVideo} autoPlay />
        );
    }

    let PartnerVideo;
    if (callAccepted) {
        PartnerVideo = (
        <Video playsInline ref={partnerVideo} autoPlay />
        );
    }

    let incomingCall;
    if (receivingCall) {
        incomingCall = (
        <div>
            <h1>{caller} is calling you</h1>
            <button onClick={acceptCall}>Accept</button>
        </div>
        )
    }
    // const otherAudio = useRef()
    // const peerRef = useRef()
    // 
    // const otherUser = useRef()
    // const userStream = useRef()
    
    // useEffect(() => {
    //     navigator.mediaDevices.getUserMedia({ audio: true}).then(stream => {
    //         userAudio.current.srcObject = stream
    //         userStream.current = stream

    //         socketRef.current = io.connect('/')
    //         socketRef.current.emit('join', props.match.params.roomId)

    //         socketRef.current.on('other', userId => {
    //             callUser(userId)
    //             otherUser.current = userId
    //         })

    //         socketRef.current.on('joined', userId => {
    //             otherUser.current = userId
    //         })

    //         socketRef.current.on('request', handleRequest)
    //         socketRef.current.on('accept', handleAccept)

    //         socketRef.current.on("ice-candidate", handleNewICECandidateMsg)
    //     })

    // }, [])

    // function callUser(userId) {
    //     peerRef.current = createPeer(userId);
    //     userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current));
    // }
    
    // function createPeer(userId) {
    //     const peer = new RTCPeerConnection({
    //         iceServers: [
    //             {
    //                 urls: 'stun:stun.stunprotocol.org'
    //             },
    //             {
    //                 urls: 'turn:numb.viagenie.ca',
    //                 credential: 'muazkh',
    //                 username: 'webrtc@live.com'
    //             }
    //         ]
    //     })

    //     peer.onicecandidate = handleICECandidateEvent
    //     peer.ontrack = handleTrackEvent
    //     peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userId)

    //     return peer

    // }

    // function handleNegotiationNeededEvent(userId) {
    //     peerRef.current.createOffer().then(offer => {
    //         return peerRef.current.setLocalDescription(offer);
    //     }).then(() => {
    //         const payload = {
    //             target: userId,
    //             caller: socketRef.current.id,
    //             sdp: peerRef.current.localDescription
    //         };
    //         socketRef.current.emit("request", payload);
    //     }).catch(e => console.log(e));
    // }

    // function handleRequest(incoming) {
    //     peerRef.current = createPeer();
    //     const desc = new RTCSessionDescription(incoming.sdp);
    //     peerRef.current.setRemoteDescription(desc).then(() => {
    //         userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current));
    //     }).then(() => {
    //         return peerRef.current.createAccept();
    //     }).then(accept => {
    //         return peerRef.current.setLocalDescription(accept);
    //     }).then(() => {
    //         const payload = {
    //             target: incoming.caller,
    //             caller: socketRef.current.id,
    //             sdp: peerRef.current.localDescription
    //         }
    //         socketRef.current.emit("accept", payload);
    //     })
    // }

    // function handleAccept(message) {
    //     const desc = new RTCSessionDescription(message.sdp);
    //     peerRef.current.setRemoteDescription(desc).catch(e => console.log(e));
    // }

    // function handleICECandidateEvent(e) {
    //     if (e.candidate) {
    //         const payload = {
    //             target: otherUser.current,
    //             candidate: e.candidate,
    //         }
    //         socketRef.current.emit("ice-candidate", payload);
    //     }
    // }

    // function handleNewICECandidateMsg(incoming) {
    //     const candidate = new RTCIceCandidate(incoming);

    //     peerRef.current.addIceCandidate(candidate)
    //         .catch(e => console.log(e));
    // }

    // function handleTrackEvent(e) {
    //     otherAudio.current.srcObject = e.streams[0];
    // };
    


    return (
        // <div>
        //     <h1>Room</h1>
        //     <div className="container">
        //         <div className="speakers">
        //             <div className='speakers-you'>
        //                 {/* <audio autoPlay ref={userAudio} /> */}
        //             </div>
        //             <div className="speakers-other">
        //                 {/* <audio autoPlay ref={otherAudio} /> */}
        //             </div>
                    
        //         </div>
        //         <div className="listeners">
        //             <h3>Listeners</h3>
        //         </div>
        //     </div>
        // </div>

        <Container>
      <Row>
        {UserVideo}
        {PartnerVideo}
      </Row>
      <Row>
        {Object.keys(users).map(key => {
          if (key === yourID) {
            return null;
          }
          return (
            <button onClick={() => callPeer(key)}>Call {key}</button>
          );
        })}
      </Row>
      <Row>
        {incomingCall}
      </Row>
    </Container>
    )
    }

export default Room;