import React from 'react'

const ChatContainer = ({activeChat,setActiveChat}) => {
  return activeChat ? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>
      {/* Header */}
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        <img src="" alt="" className='w-8 rounded-full' />
        <p className='flex-1text-lg text-white flex items-center gap-2'>
          JD
          <span className='w-2 h-2 rounded-fullbg-green-500'></span>
        </p>
        <img onClick={()=>setActiveChat(null)} src="" alt="" className='md:hidden max-w-7'/>
        <img src="" className='max-md:hidden max-w-5'/>
      </div>
      {/* chat area */}
      <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>

      </div>
    </div>
  ) : (
    <div className='h-full flex items-center justify-center'>
      <p className='text-2xl text-gray-500'>Select a chat to start messaging</p>
    </div>
  )
}

export default ChatContainer
