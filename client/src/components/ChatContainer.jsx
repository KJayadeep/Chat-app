import React, { useRef, useEffect, useState } from 'react'
import { UserIcon, PaperClipIcon, PaperAirplaneIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

const ChatContainer = ({ activeChat, setActiveChat, messages = [], currentUserId }) => {
  const [messageInput, setMessageInput] = useState('')
  const scrollEnd = useRef(null)

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // TODO: Implement actual send logic
      setMessageInput('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!activeChat) {
    return (
      <div className='h-full flex items-center justify-center bg-gradient-to-br from-violet-500/10 to-purple-500/10'>
        <div className='text-center'>
          <UserIcon className='w-16 h-16 text-gray-400 mx-auto mb-4' />
          <p className='text-xl text-gray-500 font-light'>Select a chat to start messaging</p>
        </div>
      </div>
    )
  }

  const isCurrentUser = (senderId) => senderId === currentUserId

  return (
    <div className='h-full flex flex-col backdrop-blur-lg bg-gradient-to-br from-violet-500/5 to-purple-500/5'>
      {/* Header */}
      <div className='flex items-center gap-3 py-4 px-4 border-b border-gray-700/50 bg-gray-900/50'>
        <button
          onClick={() => setActiveChat(null)}
          className='md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors'
        >
          <ArrowLeftIcon className='w-5 h-5 text-gray-400' />
        </button>
        <div className='w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold'>
          {activeChat.name?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div className='flex-1'>
          <p className='text-base font-medium text-white'>
            {activeChat.name || 'User'}
          </p>
          <p className='text-xs text-green-400 flex items-center gap-1.5'>
            <span className='w-2 h-2 bg-green-500 rounded-full'></span>
            Online
          </p>
        </div>
      </div>

      {/* Messages area */}
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.length === 0 ? (
          <div className='h-full flex items-center justify-center'>
            <p className='text-gray-500 text-sm'>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => {
            const isOwn = isCurrentUser(message.senderID)
            return (
              <div
                key={message._id || message.id}
                className={`flex gap-2 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className='w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0'>
                  {isOwn ? 'You' : (message.senderName?.charAt(0) || 'U')}
                </div>
                <div className={`max-w-[70%] ${isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
                  {message.image ? (
                    <img
                      src={message.image}
                      alt="message attachment"
                      className='max-w-full rounded-lg border border-gray-600'
                    />
                  ) : (
                    <p className={`px-4 py-2 rounded-2xl text-sm break-words ${
                      isOwn
                        ? 'bg-violet-600 text-white rounded-br-md'
                        : 'bg-gray-700/70 text-gray-100 rounded-bl-md'
                    }`}>
                      {message.content}
                    </p>
                  )}
                  <span className='text-xs text-gray-500 mt-1 px-1'>
                    {message.timestamp}
                  </span>
                </div>
              </div>
            )
          })
        )}
        <div ref={scrollEnd} />
      </div>

      {/* Input area */}
      <div className='p-4 border-t border-gray-700/50 bg-gray-900/50'>
        <div className='flex items-center gap-3'>
          <label className='cursor-pointer p-2 hover:bg-gray-800 rounded-lg transition-colors'>
            <PaperClipIcon className='w-5 h-5 text-gray-400' />
            <input
              type='file'
              id='image'
              accept='image/png, image/jpeg'
              className='hidden'
              onChange={(e) => {
                // TODO: Handle image upload
                console.log('Selected file:', e.target.files[0])
              }}
            />
          </label>
          <div className='flex-1 flex items-center bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700/50 focus-within:border-violet-500/50 transition-colors'>
            <input
              type='text'
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder='Type a message...'
              className='flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none'
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
            className='p-3 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-full transition-colors shadow-lg shadow-violet-600/20'
          >
            <PaperAirplaneIcon className='w-5 h-5 text-white rotate-90' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatContainer
