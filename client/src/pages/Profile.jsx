import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const navigate = useNavigate()
  const [name, setName] = useState('JD')
  const [bio, setBio] = useState('Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Profile saved:', { name, bio, selectedImage })
    // Optionally navigate to another page after saving
    navigate('/')
  } 

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-100 p-6'>
       <div className='w-full max-w-md bg-white rounded-2xl shadow-lg p-8'>
         <form className='flex flex-col gap-5'>
          <h3 className='text-xl font-semibold text-slate-900 mb-1'>Profile details</h3>
          <label htmlFor="avatar" className='flex flex-col items-center gap-2 cursor-pointer text-sm text-slate-500 hover:text-slate-700'>
            <input onChange={(e)=>setSelectedImage(e.target.files[0])} type="file" id="avatar" name="avatar" accept='.png .jpeg .jpg' hidden/>
            <img
              src={selectedImage ? URL.createObjectURL(selectedImage) : ""}
              alt="avatar"
              className='w-20 h-20 rounded-full object-cover bg-slate-100 border border-slate-200'
            />
            upload your profile picture
          </label>
          <input
            onChange={(e)=>setName(e.target.value)}
            type="text"
            value={name}
            placeholder='Name'
            className='w-full px-3 py-2.5 rounded-xl bg-slate-100 border border-slate-200 placeholder-slate-400 text-slate-900 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-shadow'
          />
          <textarea
            onChange={(e)=>setBio(e.target.value)}
            value={bio}
            placeholder='Bio'
            rows={4}
            className='w-full px-3 py-2.5 rounded-xl bg-slate-100 border border-slate-200 placeholder-slate-400 text-slate-900 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none transition-shadow'
          />
          <button
            onClick={handleSubmit}
            type='submit'
            className='bg-gradient-to-r from-purple-500 to-violet-600 text-white text-sm font-medium py-2.5 rounded-full cursor-pointer hover:opacity-90 active:scale-[0.98] transition'
          >
            Save
          </button>
         </form>
       </div>
    </div>
  )
}

export default Profile