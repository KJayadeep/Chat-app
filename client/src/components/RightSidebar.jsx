import React from 'react'

const RightSidebar = ({activeChat,setActiveChat}) => {
  return activeChat && (
    <div className={`bg-[#8185B2]/10 text-black w-full relative overflow-y-scroll ${activeChat? 'max-md:hidden' : ''}`}>
      <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
        <img className='w-20 aspect-[1/1] rounded-full bg-gray-300' src={activeChat?.profilePic || '/default-avatar.png'} alt={activeChat?.name} />
        <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2'>
          {activeChat?.name}
          <p className='w-2 h-2 rounded-full bg-green-500'></p>
        </h1>
        <p className='px-10 mx-auto text-gray-500'>{activeChat?.status || 'Online'}</p>
      </div>
      <hr className='border-black my-4'/>
      <div className='px-5 text-xs'>
        <p>Media</p>
        <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-3 gap-2 opacity-80'>
          {activeChat?.media?.length > 0 ? (
            activeChat.media.map((item, idx) => (
              <img key={idx} src={item} alt={`Media ${idx + 1}`} className='w-full aspect-square object-cover rounded' />
            ))
          ) : (
            <p className='col-span-3 text-center text-gray-400 py-4'>No media shared yet</p>
          )}
        </div>
      </div>
      <button className='absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-black border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer hover:opacity-90 transition-opacity'>
        Logout
      </button>
    </div>
  )
}

export default RightSidebar
