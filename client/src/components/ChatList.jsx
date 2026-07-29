import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User, LogOut, Settings, MessageSquare, X } from 'lucide-react';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';

const ChatList = ({ activeChat, setActiveChat }) => {
  const navigate = useNavigate();
  const { users, getUsers, selectedUser, setSelectedUser, unseenMessages, getMessages } = useContext(ChatContext);
  const { authUser, logout, onlineUsers } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users.filter((user) => {
    const name = user.name || user.fullName || '';
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    getMessages(user._id);
    if (setActiveChat) {
      setActiveChat(true);
    }
  };

  const authAvatar = authUser?.profilepic || authUser?.profilePic || authUser?.avatar;
  const authName = authUser?.name || authUser?.fullName || 'Account';

  return (
    <div className='w-full h-full bg-[#0b0f19] border-r border-slate-800/80 flex flex-col relative select-none'>
      {/* Sidebar Top Header */}
      <div className='p-4 border-b border-slate-800/80 flex flex-col gap-3.5'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2.5'>
            <div className='w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/20'>
              <MessageSquare className='w-5 h-5 text-white' strokeWidth={2.2} />
            </div>
            <div>
              <h1 className='text-base font-bold text-white tracking-tight leading-tight'>
                PulseChat
              </h1>
              <p className='text-[10px] text-slate-400 font-normal'>
                {onlineUsers?.length || 0} online now
              </p>
            </div>
          </div>

          {/* User Account Settings Dropdown Trigger */}
          <div className='relative'>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className='flex items-center gap-2 p-1 rounded-xl hover:bg-slate-800 border border-slate-800/80 transition-all cursor-pointer'
              title="Account Menu"
            >
              {authAvatar ? (
                <img src={authAvatar} alt={authName} className='w-7 h-7 rounded-lg object-cover' />
              ) : (
                <div className='w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xs border border-indigo-500/30'>
                  {authName.charAt(0).toUpperCase()}
                </div>
              )}
              <Settings className='w-3.5 h-3.5 text-slate-400 mr-1' />
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <>
                <div className='fixed inset-0 z-20' onClick={() => setShowMenu(false)} />
                <div className='absolute right-0 mt-2 z-30 w-52 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl backdrop-blur-xl flex flex-col gap-1 animate-fadeIn'>
                  <div className='px-3 py-2 border-b border-slate-800/80 mb-1'>
                    <p className='text-xs font-semibold text-white truncate'>{authName}</p>
                    <p className='text-[10px] text-slate-400 truncate font-normal'>{authUser?.email}</p>
                  </div>
                  <button
                    onClick={() => { setShowMenu(false); navigate('/profile'); }}
                    className='w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-indigo-600/20 rounded-xl transition-all cursor-pointer'
                  >
                    <User className='w-4 h-4 text-indigo-400' />
                    Edit Profile
                  </button>
                  <button
                    onClick={() => { setShowMenu(false); logout(); }}
                    className='w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all cursor-pointer'
                  >
                    <LogOut className='w-4 h-4' />
                    Log Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Clean Contact Search Field */}
        <div className='relative'>
          <Search className='w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2' />
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search contacts...'
            className='w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all'
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className='absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white'
            >
              <X className='w-3.5 h-3.5' />
            </button>
          )}
        </div>
      </div>

      {/* User Contacts List */}
      <div className='flex-1 overflow-y-auto p-2 space-y-1'>
        {filteredUsers.length === 0 ? (
          <div className='py-12 px-4 text-center text-slate-500 text-xs flex flex-col items-center gap-2'>
            <User className='w-8 h-8 text-slate-700 stroke-1' />
            <p className='text-slate-500 font-normal'>No contacts found</p>
          </div>
        ) : (
          filteredUsers.map((user) => {
            const isOnline = onlineUsers?.includes(user._id);
            const unseenCount = unseenMessages[user._id] || 0;
            const isSelected = selectedUser?._id === user._id;
            const avatar = user.profilepic || user.profilePic || user.avatar;
            const name = user.name || user.fullName || 'User';

            return (
              <div
                onClick={() => handleSelectUser(user)}
                key={user._id}
                className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-indigo-600/15 border-indigo-500/40 text-white'
                    : 'hover:bg-slate-800/60 border-transparent text-slate-300'
                }`}
              >
                {/* Avatar with Status Indicator */}
                <div className='relative flex-shrink-0'>
                  {avatar ? (
                    <img src={avatar} alt={name} className='w-10 h-10 rounded-xl object-cover border border-slate-700/60' />
                  ) : (
                    <div className='w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-300 flex items-center justify-center font-bold text-xs border border-indigo-500/30'>
                      {name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  {isOnline && (
                    <span className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#0b0f19] rounded-full' />
                  )}
                </div>

                {/* Contact Name & Status */}
                <div className='flex-1 min-w-0'>
                  <div className='flex justify-between items-center mb-0.5'>
                    <p className={`font-semibold text-xs truncate ${isSelected ? 'text-indigo-300' : 'text-slate-200'}`}>
                      {name}
                    </p>
                    {unseenCount > 0 && (
                      <span className='bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full'>
                        {unseenCount}
                      </span>
                    )}
                  </div>
                  <p className='text-slate-400 text-[11px] truncate font-normal'>
                    {user.bio || (isOnline ? 'Active now' : 'Offline')}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChatList;



