import React, { useRef, useEffect, useState, useContext } from 'react';
import { ArrowLeft, Paperclip, Send, X, Info, MessageSquare, Image as ImageIcon } from 'lucide-react';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';

const ChatContainer = ({ activeChat, setActiveChat, showRightSidebar, setShowRightSidebar }) => {
  const [messageText, setMessageText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const scrollEnd = useRef(null);

  const { selectedUser, setSelectedUser, messages, sendMessage } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const isOnline = selectedUser && onlineUsers?.includes(selectedUser._id);
  const targetUser = selectedUser;

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() && !imagePreview) return;

    await sendMessage({
      text: messageText,
      image: imagePreview,
    });

    setMessageText('');
    setImagePreview(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBack = () => {
    setSelectedUser(null);
    if (setActiveChat) setActiveChat(false);
  };

  // Empty state when no contact selected
  if (!targetUser) {
    return (
      <div className='w-full h-full flex flex-col items-center justify-center bg-[#070913]/60 p-6 text-center select-none relative'>
        <div className='max-w-sm flex flex-col items-center gap-3 animate-fadeIn'>
          <div className='w-16 h-16 rounded-2xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mb-1'>
            <MessageSquare className='w-8 h-8' strokeWidth={1.8} />
          </div>
          <h2 className='text-lg font-bold text-white tracking-tight'>
            No Chat Selected
          </h2>
          <p className='text-xs text-slate-400 leading-relaxed font-normal'>
            Select any contact from the left sidebar to start messaging in real-time.
          </p>
        </div>
      </div>
    );
  }

  const name = targetUser.name || targetUser.fullName || 'User';
  const avatar = targetUser.profilepic || targetUser.profilePic || targetUser.avatar;

  return (
    <div className='w-full h-full flex flex-col bg-[#080b14] relative select-none'>
      {/* Chat Top Header */}
      <div className='flex items-center justify-between px-5 py-3 border-b border-slate-800/80 bg-[#0b0f19] z-10'>
        <div className='flex items-center gap-3 min-w-0'>
          <button
            onClick={handleBack}
            className='md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all cursor-pointer'
          >
            <ArrowLeft className='w-5 h-5' />
          </button>
          
          <div className='relative flex-shrink-0'>
            {avatar ? (
              <img src={avatar} alt={name} className='w-9 h-9 rounded-xl object-cover border border-slate-700/80' />
            ) : (
              <div className='w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-300 font-bold text-xs flex items-center justify-center border border-indigo-500/30'>
                {name.charAt(0).toUpperCase()}
              </div>
            )}
            {isOnline && (
              <span className='absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#0b0f19] rounded-full' />
            )}
          </div>

          <div className='min-w-0'>
            <h2 className='text-xs font-semibold text-white truncate'>{name}</h2>
            <p className={`text-[11px] ${isOnline ? 'text-emerald-400 font-medium' : 'text-slate-400 font-normal'}`}>
              {isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>

        {/* Action Toggle Info Button */}
        {setShowRightSidebar && (
          <button
            onClick={() => setShowRightSidebar(!showRightSidebar)}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              showRightSidebar
                ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40'
                : 'text-slate-400 hover:text-white border-slate-800 hover:bg-slate-800'
            }`}
            title='Contact Info'
          >
            <Info className='w-4 h-4' />
          </button>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div className='flex-1 overflow-y-auto p-4 md:p-6 space-y-3.5'>
        {messages.length === 0 ? (
          <div className='h-full flex flex-col items-center justify-center text-center text-slate-500 text-xs py-12 gap-1.5'>
            <MessageSquare className='w-8 h-8 text-slate-700 stroke-1' />
            <p className='text-slate-400 font-medium'>No messages yet</p>
            <p className='text-slate-500 text-[11px] font-normal'>Send a message to start the conversation</p>
          </div>
        ) : (
          messages.map((message) => {
            const senderId = typeof message.senderId === 'object' ? message.senderId?._id : message.senderId || message.senderID;
            const isOwn = senderId === authUser?._id;
            const content = message.text || message.content;
            const formattedTime = message.createdAt
              ? new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              : message.timestamp || '';

            return (
              <div
                key={message._id || message.id}
                className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} animate-fadeIn`}
              >
                {/* Message Bubble Card */}
                <div
                  className={`max-w-[75%] md:max-w-[60%] p-3 rounded-2xl text-xs leading-relaxed break-words ${
                    isOwn
                      ? 'bg-indigo-600 text-white rounded-br-xs shadow-sm'
                      : 'bg-slate-800/90 text-slate-100 rounded-bl-xs border border-slate-700/60'
                  }`}
                >
                  {message.image && (
                    <div className='mb-2 overflow-hidden rounded-xl border border-white/10'>
                      <img
                        src={message.image}
                        alt="Attachment"
                        className='max-w-xs md:max-w-sm max-h-72 w-full object-cover rounded-lg'
                      />
                    </div>
                  )}
                  {content && <p>{content}</p>}
                </div>
                
                {/* Time Indicator */}
                <span className='text-[10px] text-slate-500 mt-1 px-1 font-mono'>
                  {formattedTime}
                </span>
              </div>
            );
          })
        )}
        <div ref={scrollEnd} />
      </div>

      {/* Image Preview Floating Banner */}
      {imagePreview && (
        <div className='relative px-4 py-2 bg-slate-900 border-t border-slate-800 flex items-center justify-between animate-fadeIn'>
          <div className='flex items-center gap-3'>
            <div className='relative group'>
              <img src={imagePreview} alt="Preview" className='w-12 h-12 object-cover rounded-xl border border-slate-700' />
              <button
                onClick={() => setImagePreview(null)}
                className='absolute -top-1.5 -right-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full p-0.5 shadow-md transition-all cursor-pointer'
              >
                <X className='w-3 h-3' />
              </button>
            </div>
            <span className='text-xs text-slate-300 font-medium flex items-center gap-1.5'>
              <ImageIcon className='w-4 h-4 text-indigo-400' />
              Image attached
            </span>
          </div>
        </div>
      )}

      {/* Message Input Bottom Control Bar */}
      <div className='p-3 md:p-4 border-t border-slate-800/80 bg-[#0b0f19]'>
        <div className='flex items-center gap-2 max-w-4xl mx-auto'>
          <label className='p-2.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-xl transition-all cursor-pointer border border-transparent'>
            <Paperclip className='w-4 h-4' />
            <input
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleImageChange}
            />
          </label>

          <div className='flex-1 flex items-center bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 focus-within:border-indigo-500/60 focus-within:ring-1 focus-within:ring-indigo-500/20 transition-all'>
            <input
              type='text'
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={`Write a message...`}
              className='w-full bg-transparent text-xs text-white placeholder-slate-500 outline-none'
            />
          </div>

          <button
            onClick={handleSendMessage}
            disabled={!messageText.trim() && !imagePreview}
            className='p-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-xl transition-all shadow-md shadow-indigo-600/20 cursor-pointer disabled:cursor-not-allowed'
          >
            <Send className='w-4 h-4' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;



