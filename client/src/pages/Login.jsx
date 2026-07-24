import React, { useState } from 'react'
import { MessageCircle, User, Mail, Lock, ArrowRight } from 'lucide-react'

const Login = () => {

  const [currState, setCurrState] = useState('Sign Up')
  const [userName, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [bio, setBio] = useState('')
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)

  const onSubmitHandler = (e) => {
    e.preventDefault()

    if (currState === 'Sign Up' && !isDataSubmitted) {
      setIsDataSubmitted(true)
      return
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-6 bg-[linear-gradient(90deg,#df3000_0%,#ff9125_16.667%,#dad99a_33.333%,#72e0e8_50%,#14a3d6_66.667%,#004373_83.333%,#3a0005_100%)]'>

      <form
        onSubmit={onSubmitHandler}
        className='w-full max-w-sm bg-white/95 backdrop-blur-2xl border border-white/60 p-8 rounded-3xl shadow-2xl flex flex-col gap-5'
      >
        <div className='flex flex-col items-center gap-2 mb-2'>
          <div className='w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center'>
            <MessageCircle className='w-6 h-6 text-white' strokeWidth={2.5} />
          </div>
          <h2 className='text-2xl font-semibold text-slate-900 tracking-tight'>
            {currState === 'Sign Up' ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className='text-sm text-slate-500 text-center'>
            {currState === 'Sign Up' ? 'Sign up to start chatting' : 'Log in to continue chatting'}
          </p>
        </div>

        {currState === 'Sign Up' && !isDataSubmitted && (
          <div className='relative'>
            <User className='w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2' />
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={userName}
              type='text'
              placeholder='Username'
              required
              className='w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-100 border border-slate-200 placeholder-slate-400 text-slate-900 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-shadow'
            />
          </div>
        )}

        {!isDataSubmitted && (
          <>
            <div className='relative'>
              <Mail className='w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2' />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type='email'
                placeholder='Email address'
                required
                className='w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-100 border border-slate-200 placeholder-slate-400 text-slate-900 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-shadow'
              />
            </div>

            <div className='relative'>
              <Lock className='w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2' />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type='password'
                placeholder='Password'
                required
                className='w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-100 border border-slate-200 placeholder-slate-400 text-slate-900 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-shadow'
              />
            </div>
          </>
        )}

        {currState === 'Sign Up' && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className='w-full px-3 py-2.5 rounded-xl bg-slate-100 border border-slate-200 placeholder-slate-400 text-slate-900 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none transition-shadow'
            placeholder='Provide a short bio'
            required
          />
        )}

        <button
          type='submit'
          className='flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-violet-600 text-white border-none text-sm font-medium py-2.5 rounded-full cursor-pointer hover:opacity-90 active:scale-[0.98] transition'
        >
          {currState === 'Sign Up'
            ? (isDataSubmitted ? 'Create account' : 'Continue')
            : 'Login'}
          <ArrowRight className='w-4 h-4' />
        </button>

        <label className='flex items-center gap-2 text-xs text-slate-500 select-none'>
          <input type='checkbox' required className='w-4 h-4 rounded accent-violet-600' />
          Agree to the terms and conditions
        </label>

        <div className='text-center text-xs text-slate-500'>
          {currState === 'Sign Up' ? (
            <p>
              Already have an account?{' '}
              <span
                onClick={() => { setCurrState('Login'); setIsDataSubmitted(false) }}
                className='text-violet-600 font-medium underline underline-offset-2 cursor-pointer hover:opacity-80'
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <span
                onClick={() => setCurrState('Sign Up')}
                className='text-violet-600 font-medium underline underline-offset-2 cursor-pointer hover:opacity-80'
              >
                Create one
              </span>
            </p>
          )}
        </div>

      </form>
    </div>
  )
}

export default Login