import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Bars3Icon, MagnifyingGlassIcon, UserIcon, PencilSquareIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

const ChatList = ({ activeChat, setActiveChat }) => {
  const navigate = useNavigate()

  const userDummyData = [
    { id: 1, name: 'Alice Johnson', lastMessage: 'Hey! How are you doing?', timestamp: '10:30 AM', avatar: '', online: true },
    { id: 2, name: 'Bob Smith', lastMessage: 'Did you see the latest update?', timestamp: '09:15 AM', avatar: '', online: true },
    { id: 3, name: 'Carol Williams', lastMessage: 'Let me check and get back to you', timestamp: 'Yesterday', avatar: '', online: false },
    { id: 4, name: 'David Brown', lastMessage: 'Thanks for the help!', timestamp: 'Yesterday', avatar: '', online: true },
    { id: 5, name: 'Eva Martinez', lastMessage: 'See you tomorrow!', timestamp: 'Mon', avatar: '', online: false },
    { id: 6, name: 'Frank Lee', lastMessage: 'That sounds great!', timestamp: 'Sun', avatar: '', online: false },
  ]

  return (
    <div className={`bg-[#1a1a2e] border-r border-gray-700 h-full flex flex-col ${activeChat ? 'hidden md:flex' : ''}`}>
      {/* Header */}
      <div className='p-4 border-b border-gray-700'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-xl font-bold text-white'>Messages</h1>
          <div className='relative group'>
            <button className='p-2 hover:bg-gray-700 rounded-lg transition-colors'>
              <Bars3Icon className="h-5 w-5 text-gray-300" />
            </button>
            <div className='absolute top-full right-0 mt-1 z-20 w-40 p-2 rounded-lg bg-[#282142] border border-gray-600 shadow-xl hidden group-hover:block'>
              <button
                onClick={() => navigate('/profile')}
                className='w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md transition-colors'
              >
                <PencilSquareIcon className='h-4 w-4' />
                Edit Profile
              </button>
              <hr className='my-1 border-gray-600' />
              <button className='w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-gray-700 rounded-md transition-colors'>
                <ArrowRightOnRectangleIcon className='h-4 w-4' />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className='relative'>
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type='text'
            placeholder='Search conversations...'
            className='w-full bg-[#282142] border border-gray-600 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-gray-500 transition-colors'
          />
        </div>
      </div>

      {/* Chat List */}
      <div className='flex-1 overflow-y-auto p-2'>
        {userDummyData.map((user, index) => (
          <div
            onClick={() => setActiveChat(user)}
            key={user.id}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors mb-1
              ${activeChat?.id === user.id
                ? 'bg-[#282142] border border-gray-600'
                : 'hover:bg-[#282142]/50 border border-transparent'
              }`}
          >
            {/* Avatar */}
            <div className='relative flex-shrink-0'>
              <div className='h-12 w-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg'>
                {user.online ? (
                  <UserIcon className="h-6 w-6" />
                ) : (
                  <UserIcon className="h-6 w-6 text-gray-300" />
                )}
              </div>
              {user.online && (
                <span className='absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-[#1a1a2e] rounded-full'></span>
              )}
            </div>

            {/* User Info */}
            <div className='flex-1 min-w-0'>
              <div className='flex justify-between items-center mb-0.5'>
                <p className='text-white font-medium text-sm truncate'>{user.name}</p>
                <span className='text-xs text-gray-500 flex-shrink-0'>{user.timestamp}</span>
              </div>
              <p className='text-gray-400 text-xs truncate'>{user.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatList
