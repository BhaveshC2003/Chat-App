import React from 'react'
import './home.css'
import {Link} from 'react-router-dom'
import { useState } from 'react'

let userName;

const Home = () => {

  const [name,setName] = useState('');
  userName = name;
  return (
    <div className='chat__home'>
      <div className='chat__home-input'>
      <label htmlFor="username">Name</label>
        <input onChange={(e)=>setName(e.target.value)} type="text" name="name" id="username" value={name} />
      </div>
        
        <Link to='/chat'><button>Join</button></Link>

    </div>
  )
}
export {userName};
export default Home