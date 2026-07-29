import React, { useState, useContext } from 'react';
import { MessageSquare, User, Mail, Lock, ArrowRight } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [currState, setCurrState] = useState('Sign Up');
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');

  const { login } = useContext(AuthContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    login(currState === 'Sign Up' ? 'signup' : 'login', {
      name: userName,
      email,
      password,
      bio,
    });
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4 bg-[#070913] text-slate-100 select-none relative overflow-hidden'>
      {/* Subtle ambient gradient highlights */}
      <div className='absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none' />

      <div className='w-full max-w-md z-10 animate-fadeIn'>
        {/* Brand Logo Header */}
        <div className='flex flex-col items-center gap-2.5 mb-6 text-center'>
          <div className='w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30'>
            <MessageSquare className='w-6 h-6 text-white' strokeWidth={2.2} />
          </div>
          <div>
            <h1 className='text-2xl font-bold tracking-tight text-white'>PulseChat</h1>
            <p className='text-xs text-slate-400 mt-0.5 font-normal'>
              {currState === 'Sign Up'
                ? 'Create a new account to get started'
                : 'Welcome back! Sign in to continue'}
            </p>
          </div>
        </div>

        {/* Clean Auth Form Card */}
        <div className='glass-panel p-7 rounded-3xl shadow-2xl border border-slate-800 backdrop-blur-xl'>
          {/* Tab Switcher */}
          <div className='flex p-1 bg-slate-900/90 rounded-xl border border-slate-800 mb-6'>
            <button
              type='button'
              onClick={() => setCurrState('Sign Up')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                currState === 'Sign Up'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign Up
            </button>
            <button
              type='button'
              onClick={() => setCurrState('Login')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                currState === 'Login'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Login
            </button>
          </div>

          <form onSubmit={onSubmitHandler} className='flex flex-col gap-4'>
            {/* Full Name (Sign Up only) */}
            {currState === 'Sign Up' && (
              <div className='flex flex-col gap-1.5'>
                <label className='text-xs font-medium text-slate-300'>Full Name</label>
                <div className='relative'>
                  <User className='w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2' />
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    value={userName}
                    type='text'
                    placeholder='John Doe'
                    required
                    className='w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-white text-xs placeholder-slate-500 outline-none'
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-medium text-slate-300'>Email Address</label>
              <div className='relative'>
                <Mail className='w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2' />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type='email'
                  placeholder='name@example.com'
                  required
                  className='w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-white text-xs placeholder-slate-500 outline-none'
                />
              </div>
            </div>

            {/* Password */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-medium text-slate-300'>Password</label>
              <div className='relative'>
                <Lock className='w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2' />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type='password'
                  placeholder='••••••••'
                  required
                  className='w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-white text-xs placeholder-slate-500 outline-none'
                />
              </div>
            </div>

            {/* Optional Bio (Sign Up only) */}
            {currState === 'Sign Up' && (
              <div className='flex flex-col gap-1.5'>
                <label className='text-xs font-medium text-slate-300 flex items-center justify-between'>
                  <span>Bio / Status</span>
                  <span className='text-[10px] text-slate-500 font-normal'>Optional</span>
                </label>
                <input
                  onChange={(e) => setBio(e.target.value)}
                  value={bio}
                  type='text'
                  placeholder='Hey there! I am using PulseChat'
                  className='w-full px-3.5 py-2.5 rounded-xl glass-input text-white text-xs placeholder-slate-500 outline-none'
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type='submit'
              className='mt-2 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold text-xs py-3 rounded-xl transition-all shadow-md shadow-indigo-600/20 cursor-pointer'
            >
              <span>{currState === 'Sign Up' ? 'Create Account' : 'Sign In'}</span>
              <ArrowRight className='w-4 h-4' />
            </button>
          </form>
        </div>

        {/* Footer info */}
        <p className='text-center text-[11px] text-slate-500 mt-6 font-normal'>
          PulseChat &bull; Fast, Secure Realtime Messaging
        </p>
      </div>
    </div>
  );
};

export default Login;