import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { GetAllChat, sendChatMessage } from '../../../Axios/Service/UserServices';
import io from 'socket.io-client';
const ENDPOINT = "http://localhost:3001";
// `${process.env.REACT_APP_END_POINT}`;
function ChatArea() {
    const { clientDetails } = useSelector((state) => state.admin);
    const { selecteduserdetails } = useSelector((state) => state.admin);
    const [chatDataFrom, setChatDataFrom] = useState('');
    const [chat, setChat] = useState('');
    const [message, setMessage] = useState('');
    const [arrvelmessage, setArrvelMessage] = useState(null);
    const socket = useRef();
    const scrollRef = useRef();
    async function getallChats() {
        const token = localStorage.getItem("token");

        const data = await GetAllChat(token, selecteduserdetails._id);
        console.log(data)
        if (data.messages) {
            setChatDataFrom(data.from);
            setChat(data.messages);
        } else {
            setChat(false);
        }

    }
    async function SendMessage() {
        const token = localStorage.getItem('token');

        const value = {
            to: selecteduserdetails._id,
            message: message
        }
        socket.current.emit('sendMessage', {
            senderId: clientDetails.userId,
            receverId: selecteduserdetails._id,
            text: message,
        });
        await sendChatMessage(token, value).then(() => {
            getallChats();
        });

        setMessage('');
    }
    // socket io
    useEffect(() => {
        socket.current = io(ENDPOINT);
        socket.current.on('getMessage', (data) => {
            console.log('on dtat');
            console.log(data);
            setArrvelMessage({
                _id: data.senderId,
                messages: {
                    message: data.text,
                    realtime: Date.now(),
                },
            });
        });
    }, []);

    useEffect(() => {
        arrvelmessage && setChat((prev) => [...prev, arrvelmessage]);
        console.log(chat);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arrvelmessage]);

    useEffect(() => {
        socket.current.emit('addUser', clientDetails.userId);
        socket.current.on('getUsers', (users) => {
            console.log(users);
        });
    }, [clientDetails.userId]);

    useEffect(() => {
        getallChats()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selecteduserdetails])
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chat]);
    return (

        <div class="col-12 col-lg-7 col-xl-9">
            {selecteduserdetails ? (
                <>
                    <div class="py-2 px-4 border-bottom d-none d-lg-block">
                        <div class="d-flex align-items-center py-1">
                            <div class="position-relative">
                                <img src="https://bootdey.com/img/Content/avatar/avatar6.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
                            </div>
                            <div class="flex-grow-1 pl-3">
                                <strong>{selecteduserdetails?.name}</strong>
                                <div class="text-muted small"><em>Typing...</em></div>
                            </div>
                            <div>
                                {/* <button class="btn btn-primary btn-lg mr-1 px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone feather-lg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></button>
                                <button class="btn btn-info btn-lg mr-1 px-3 d-none d-md-inline-block"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-video feather-lg"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg></button>
                                <button class="btn btn-light border btn-lg px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal feather-lg"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button> */}
                            </div>
                        </div>
                    </div>

                    <div class="position-relative">
                        <div class="chat-messages p-4">
                            {chat ? (
                                chat.map((data, index) => {
                                    if (data._id === chatDataFrom) {
                                        return (
                                            <div class="chat-message-right pb-4">
                                                <div>
                                                    <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40" />
                                                    <div class="text-muted small text-nowrap mt-2">
                                                        {data.messages.time}
                                                    </div>
                                                </div>
                                                <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                                    <div class="font-weight-bold mb-1">You</div>
                                                    {data.messages.message}
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div class="chat-message-left pb-4">
                                                <div>
                                                    <img src="https://bootdey.com/img/Content/avatar/avatar6.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
                                                    <div class="text-muted small text-nowrap mt-2">  {data.messages.time} </div>
                                                </div>
                                                <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                                                    <div class="font-weight-bold mb-1">{selecteduserdetails?.name}</div>
                                                    {data.messages.message}
                                                </div>
                                            </div>

                                        )
                                    }
                                }
                                )) : ""}

                            <div ref={scrollRef}></div>

                        </div>
                    </div>

                    <div class="flex-grow-0 py-3 px-4 border-top">
                        <div class="input-group">
                            <input value={message} onChange={(e) => {
                                setMessage(e.target.value);
                            }} type="text" class="form-control" placeholder="Type your message" />
                            <button class="btn btn-primary" onClick={((e) => {
                                if (message === '') {

                                } else {
                                    SendMessage()
                                }
                            })}>Send</button>
                        </div>
                    </div>
                </>
            ) : ""}
        </div>

    )
}

export default ChatArea