import React, { useContext } from 'react';
import { LogOut, Image as ImageIcon, X, Mail, Info } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const RightSidebar = ({ activeChat, setActiveChat, onClose }) => {
  const { logout, onlineUsers } = useContext(AuthContext);
  const { selectedUser, messages } = useContext(ChatContext);

  if (!selectedUser) return null;

  const isOnline = onlineUsers?.includes(selectedUser._id);
  const avatar = selectedUser.profilepic || selectedUser.profilePic || selectedUser.avatar;
  const name = selectedUser.name || selectedUser.fullName || 'User';

  const mediaMessages = messages.filter((m) => m.image);

  return (
    <div className='w-full h-full bg-[#0b0f19] border-l border-slate-800/80 text-slate-100 flex flex-col relative overflow-y-auto select-none'>
      {/* Header */}
      <div className='p-4 border-b border-slate-800/80 flex items-center justify-between'>
        <span className='text-xs font-semibold text-white flex items-center gap-2'>
          <Info className='w-4 h-4 text-indigo-400' /> Contact Info
        </span>
        {onClose && (
          <button
            onClick={onClose}
            className='p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all cursor-pointer'
          >
            <X className='w-4 h-4' />
          </button>
        )}
      </div>

      {/* User Profile Card */}
      <div className='p-6 flex flex-col items-center text-center border-b border-slate-800/80 bg-slate-900/40'>
        <div className='relative mb-3'>
          {avatar ? (
            <img className='w-20 h-20 rounded-2xl object-cover border border-slate-700' src={avatar} alt={name} />
          ) : (
            <div className='w-20 h-20 rounded-2xl bg-indigo-600/20 text-indigo-300 flex items-center justify-center text-2xl font-bold border border-indigo-500/30'>
              {name.charAt(0).toUpperCase()}
            </div>
          )}
          {isOnline && (
            <span className='absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0b0f19] rounded-full' />
          )}
        </div>

        <h2 className='text-sm font-bold text-white'>
          {name}
        </h2>
        <p className='text-xs text-slate-400 mt-1 max-w-[240px] font-normal leading-relaxed'>
          {selectedUser.bio || 'Hey there! I am using PulseChat.'}
        </p>

        <div className='mt-3 flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300'>
          <Mail className='w-3.5 h-3.5 text-indigo-400' />
          <span className='truncate max-w-[180px]'>{selectedUser.email}</span>
        </div>
      </div>

      {/* Shared Media Gallery */}
      <div className='p-4 flex-1 flex flex-col'>
        <div className='flex items-center justify-between mb-3'>
          <span className='text-xs font-semibold text-slate-300 flex items-center gap-1.5'>
            <ImageIcon className='w-3.5 h-3.5 text-indigo-400' /> Shared Media
          </span>
          <span className='text-[10px] text-slate-400 font-mono bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800'>
            {mediaMessages.length}
          </span>
        </div>

        <div className='grid grid-cols-3 gap-2 max-h-60 overflow-y-auto p-1'>
          {mediaMessages.length > 0 ? (
            mediaMessages.map((item, idx) => (
              <div key={item._id || idx} className='relative group aspect-square overflow-hidden rounded-xl border border-slate-800'>
                <img
                  src={item.image}
                  alt={`Shared ${idx + 1}`}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-200'
                />
              </div>
            ))
          ) : (
            <div className='col-span-3 py-8 text-center text-slate-500 text-xs flex flex-col items-center gap-1.5'>
              <ImageIcon className='w-6 h-6 stroke-1 text-slate-700' />
              <span>No shared media</span>
            </div>
          )}
        </div>
      </div>

      {/* Log Out Action */}
      <div className='p-4 border-t border-slate-800/80 bg-slate-900/30 mt-auto'>
        <button 
          onClick={logout} 
          className='w-full flex items-center justify-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-semibold py-2.5 rounded-xl transition-all cursor-pointer'
        >
          <LogOut className='w-4 h-4' />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default RightSidebar;



