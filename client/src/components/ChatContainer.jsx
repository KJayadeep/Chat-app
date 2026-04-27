import React, { useRef, useEffect } from 'react'
import { UserIcon,PaperClipIcon,PaperAirplaneIcon } from '@heroicons/react/24/outline'

const ChatContainer = ({activeChat,setActiveChat}) => {

  const scrollEnd = React.useRef(null)

  useEffect(() => {
    if(scrollEnd.current) { 
    scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const messagesDummyData = [
    {
      id: 1,
      sender: 'John Doe',
      content: 'Hey, how are you?',
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      sender: 'You',
      content: 'I am good, thanks! How about you?',
      timestamp: '10:32 AM'
    },
    {
      id: 3,
      sender: 'John Doe',
      content: 'I am doing well too. What are you up to?',
      timestamp: '10:35 AM'
    },
    {
      id: 4,
      sender: 'You',
      content: 'Just working on a project. You?',
      timestamp: '10:37 AM'
    },
    ]
  return activeChat ? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>
      {/* Header */}
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        <UserIcon className="h-8 w-8 text-black" />
        <p className='flex-1text-lg text-black flex items-center gap-2'>
          JD
          <span className='w-2 h-2 rounded-fullbg-green-500'></span>
        </p>
        <img onClick={()=>setActiveChat(null)} src="" alt="" className='md:hidden max-w-7'/>
        <img src="" className='max-md:hidden max-w-5'/>
      </div>
      {/* chat area */}
      <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
        {messagesDummyData.map((message, index) => (
          <div key={index} className={`flex gap-2 items-end justify-end ${message.senderID !== '680f50e4f10f3cd28382ecf9' && 'flex-row-reverse'}`}>
            {message.image ? (
              <img src={message.image} alt="message" className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8' />
            ) : (
              <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${message.senderID === '680f50e4f10f3cd28382ecf9' ? 'rounded-br-none' : 'rounded-bl-none'} `}>{message.content}</p>
            )}
            <div className='text-center text-xs'>
              <img src={message.senderID === '680f50e4f10f3cd28382ecf9' ? 'your-image-url' : 'other-image-url'} alt="" className='w-7 rounded-full'/>
              <p className='text-gray-500'>{message.timestamp}</p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>
      {/* Input area */}
      <div className=' absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3'>
          <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full'>
            <input type="text" placeholder='Send a message' className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-black placeholder-gray-400'/>
            <input type='file' id='image' accept='image/png, image/jpeg' hidden/>
            <label htmlFor='image' className='cursor-pointer'>
              <PaperClipIcon className='w-5 mr-2 cursor-pointer'/>
            </label>
          </div>
          <button className='bg-violet-500 p-2 rounded-full'>
            <PaperAirplaneIcon className='w-5 rotate-90 text-white'/>
          </button>

      </div>
    </div>
  ) : (
    <div className='h-full flex items-center justify-center'>
      <p className='text-2xl text-gray-500'>Select a chat to start messaging</p>
    </div>
  )
}

export default ChatContainer
