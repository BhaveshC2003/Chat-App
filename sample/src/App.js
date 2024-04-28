import socketIO from 'socket.io-client'
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Chat from './components/Chat/Chat';

function App() {

  return (
    <div className='app'>
  <BrowserRouter>
         <Routes>
         <Route path="/" element = {<Home />} />
         <Route path='/chat' element={<Chat />} />
         </Routes>
            
          
    </BrowserRouter>
    </div>
  
    
  );
}

export default App;
