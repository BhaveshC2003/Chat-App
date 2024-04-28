import React, { useEffect,useState } from 'react'
import './chat.css'
import {MdChevronRight} from 'react-icons/md'
import socketIO, { Socket } from 'socket.io-client'
import {userName} from '../Home/Home'
import Message from '../Message/Message'

const ENDPOINT = 'http://localhost:8080';

let client;


const Chat = () => {
    const [id,setId] = useState();
    const [messages,setMessages] = useState([{}]);
    const sendMessageToServer = ()=>{
        const message = document.getElementById('chatInput').value;
        client.emit('sendMessageToServer',{message,id});
        document.getElementById('chatInput').value = '';
    }


    useEffect(()=>{
        client = socketIO(ENDPOINT,{transports: ['websocket']});
        client.on('connect',()=>{
            setId(client.id);
            console.log(`${userName} has joined`);
            client.emit('joined',{userName});
            client.on('greet',({message})=>setMessages([...messages,message]));
            client.on('userJoined',({message})=>setMessages([...messages,message]));
        });

    },[]);

   
    useEffect(()=>{
        client.on('sendMessageToUser',({user,id,message})=>{
            setMessages([...messages,{
                user: user,
                id: id,
                message: message
            }]);

            return ()=>{
                client.off();
            }
    })},[messages]);

  return (
    <div className='chat__chat-box'>
        <div className='chat__chat-box-header'>
        </div>

        <div className='chat__chat-box-container'>
            {
                messages.map((details,index)=><Message key={index} user={userName===details.user ? '' : details.user} message={details.message} 
                class_name={userName===details.user ? 'right' : 'left'}    />)
            }
           
        </div>

        <div className='chat__chat-box-input'>
            <input onKeyPress={(e)=>e.key==='Enter' ? sendMessageToServer() : null} type="text" id='chatInput'/>
            <button onClick={sendMessageToServer} ><MdChevronRight /></button>
        </div>

    </div>
  )
}

export default Chat