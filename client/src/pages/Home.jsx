import React, { useState } from 'react'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import ChatList from '../components/ChatList'

const Home = () => {

    const[activeChat, setActiveChat] = useState(false)

  return (
    <div className='border w-full h-screen'>
    <div className={`h-full overflow-hidden bg-violet-200 grid grid-cols-1 ${activeChat? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            <ChatList activeChat={activeChat} setActiveChat={setActiveChat} />
            <ChatContainer activeChat={activeChat} setActiveChat={setActiveChat}/>
            <RightSidebar activeChat={activeChat} setActiveChat={setActiveChat}/>
        </div>
    </div>
  )
}

export default Home
