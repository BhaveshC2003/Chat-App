import React from 'react'
import './message.css'

const Message = ({user,message,class_name}) => {
 
  if(!user){
    return (
      <div className={`chat__chat-box-message ${class_name}`}>
          {`You: ${message}`}
      </div>
    )
  }else{
    return(
      <div className={`chat__chat-box-message ${class_name}`}>
        {`${user}: ${message}`}
      </div>
    )
  }



}

export default Message