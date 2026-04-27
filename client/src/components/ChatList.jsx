import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Bars3Icon,MagnifyingGlassIcon,UserIcon } from "@heroicons/react/24/outline";

const ChatList = ({ activeChat , setActiveChat}) => {
const navigate = useNavigate()

const userDummyData = [
    {
        id: 1,
        name: 'John Doe',
        lastMessage: 'Hey, how are you?',
        timestamp: '10:30 AM',
        avatar: ""
    },
    {
        id: 2,
        name: 'John Doe',
        lastMessage: 'Hey, how are you?',
        timestamp: '10:30 AM',
        avatar: ""
    },
    {
        id: 3,
        name: 'John Doe',
        lastMessage: 'Hey, how are you?',
        timestamp: '10:30 AM',
        avatar: ""
    },
    {
        id: 4,
        name: 'John Doe',
        lastMessage: 'Hey, how are you?',
        timestamp: '10:30 AM',
        avatar: ""
    },
]

  return (
    <div className={`bg-violet-200 border-gray-600 border-r h-full p-5 ${activeChat? 'hidden md:block' : ''}`}>
        {/* Header */}
        <div className='flex flex-col gap-1'>
            <div className='flex justify-between items-center'>
                <h1 className='bg-red-800'>Chat List</h1>
                <div className='relative py-2 group'>
                    {/* <h2 className='cursor-pointer max-h-5 '>menu</h2> */}
                    <Bars3Icon className="h-6 w-6 text-black" />
                    <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 hidden group-hover:block text-gray-100'>
                        <p onClick={() => navigate('/profile')} className='cursor-pointer text-sm'>Edit Profile</p>
                        <hr className='my-2 border-t border-gray-400' />
                        <p className='cursor-pointer text-sm'>Logout</p>
                    </div>
                </div>
            </div>
            <div className='bg-red-800 rounded-full flex items-center gap-2 py-3 px-4 mt-5'>
                <MagnifyingGlassIcon className="h-5 w-5 text-black" />
                <input type='text' placeholder='Search' className='bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8]flex-1' />
            </div>
        </div>
        {/* Chat List */}
        <div className='flex flex-col'>
            {userDummyData.map((user, index) => (
                <div onClick={()=>{setActiveChat(user)}} key={index} className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${activeChat?.id === user.id && 'bg-[#282142]/50'}`}>
                    <UserIcon className="h-8 w-8 text-black" />
                    <div className='flex flex-col leading-5'>
                        <p>{user.name}</p>
                        {
                            index < 3 ? <span className='text-green-400 text-xs'>Online</span> : <span className='text-neutral-400 text-xs'>Offline</span>
                        }

                    </div>
                    {index > 2 && <p className='absolute top-4 right-4 text-xs w-5 h-5 flex justify-center items-center rounded-full bg-violet-500/50'>{index}</p>}

                </div>
            ))}
        </div>
    </div>
  )
}

export default ChatList
