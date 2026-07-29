import React, { useState } from 'react';
import ChatContainer from '../components/ChatContainer';
import RightSidebar from '../components/RightSidebar';
import ChatList from '../components/ChatList';

const Home = () => {
  const [activeChat, setActiveChat] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(true);

  return (
    <div className='h-screen w-full bg-[#070a12] text-slate-100 flex items-start justify-center p-0 md:p-3 relative overflow-hidden select-none'>
      {/* Background glowing gradients */}
      <div className='absolute -top-32 -left-32 w-96 h-96 bg-violet-600/15 rounded-full blur-[140px] pointer-events-none' />
      <div className='absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none' />

      {/* Main Glass Application Container */}
      <div className='w-full max-w-[1600px] h-full md:h-[96vh] md:rounded-3xl glass-panel border border-slate-800/80 shadow-2xl flex overflow-hidden relative z-10 backdrop-blur-2xl'>
        {/* Left Sidebar - Chat List */}
        <div className={`w-full md:w-[340px] lg:w-[380px] flex-shrink-0 h-full ${activeChat ? 'hidden md:flex' : 'flex'}`}>
          <ChatList activeChat={activeChat} setActiveChat={setActiveChat} />
        </div>

        {/* Central Chat Workspace */}
        <div className={`flex-1 h-full flex flex-col ${!activeChat ? 'hidden md:flex' : 'flex'}`}>
          <ChatContainer
            activeChat={activeChat}
            setActiveChat={setActiveChat}
            showRightSidebar={showRightSidebar}
            setShowRightSidebar={setShowRightSidebar}
          />
        </div>

        {/* Right Sidebar - Contact Details */}
        {showRightSidebar && (
          <div className={`w-full md:w-[300px] lg:w-[340px] flex-shrink-0 h-full ${!activeChat ? 'hidden lg:flex' : 'hidden md:flex'}`}>
            <RightSidebar activeChat={activeChat} setActiveChat={setActiveChat} onClose={() => setShowRightSidebar(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

