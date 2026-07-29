import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ArrowLeft, Save } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {
  const { authUser, updateProfile } = useContext(AuthContext);

  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser?.name || authUser?.fullName || '');
  const [bio, setBio] = useState(authUser?.bio || '');
  const [loading, setLoading] = useState(false);

  const currentAvatar = authUser?.profilepic || authUser?.profilePic || authUser?.avatar;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!selectedImage) {
      await updateProfile({ name, bio });
      setLoading(false);
      navigate('/');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onloadend = async () => {
      const base64Image = reader.result;
      await updateProfile({ name, bio, avatar: base64Image });
      setLoading(false);
      navigate('/');
    };
  };

  return (
    <div className='min-h-screen w-full bg-[#070913] text-slate-100 flex items-center justify-center p-4 relative select-none'>
      <div className='w-full max-w-md z-10'>
        {/* Back Button Header */}
        <div className='flex items-center justify-between mb-6'>
          <button
            onClick={() => navigate('/')}
            className='flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer'
          >
            <ArrowLeft className='w-4 h-4' /> Back to Chat
          </button>
        </div>

        {/* Profile Card Container */}
        <div className='bg-[#0b0f19] p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
            <div>
              <h1 className='text-xl font-bold text-white tracking-tight'>Edit Profile</h1>
              <p className='text-xs text-slate-400 font-normal mt-1'>Update your personal details and avatar</p>
            </div>

            {/* Avatar Upload */}
            <div className='flex flex-col items-center gap-2'>
              <label htmlFor="avatar" className='relative group cursor-pointer'>
                <input
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept='image/*'
                  hidden
                />

                <div className='relative overflow-hidden rounded-2xl border border-slate-700 p-1 bg-slate-900'>
                  {selectedImage ? (
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="avatar preview"
                      className='w-24 h-24 rounded-xl object-cover'
                    />
                  ) : currentAvatar ? (
                    <img
                      src={currentAvatar}
                      alt="avatar"
                      className='w-24 h-24 rounded-xl object-cover'
                    />
                  ) : (
                    <div className='w-24 h-24 rounded-xl bg-indigo-600/20 text-indigo-300 flex items-center justify-center text-3xl font-bold border border-indigo-500/30'>
                      {name ? name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}

                  {/* Camera Icon Overlay */}
                  <div className='absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-1 text-[11px] font-semibold text-white'>
                    <Camera className='w-5 h-5 text-indigo-400' />
                  </div>
                </div>
              </label>
              <span className='text-[11px] text-slate-400 font-normal'>Click to change picture</span>
            </div>

            {/* Form Inputs */}
            <div className='space-y-4'>
              <div>
                <label className='block text-xs font-semibold text-slate-300 mb-1.5'>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className='w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all'
                />
              </div>

              <div>
                <label className='block text-xs font-semibold text-slate-300 mb-1.5'>Email Address</label>
                <input
                  type="email"
                  value={authUser?.email || ''}
                  disabled
                  className='w-full bg-slate-900/50 border border-slate-800/80 rounded-xl px-4 py-2.5 text-xs text-slate-400 cursor-not-allowed outline-none'
                />
              </div>

              <div>
                <label className='block text-xs font-semibold text-slate-300 mb-1.5'>Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Write a brief bio..."
                  className='w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none'
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className='w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50'
            >
              {loading ? (
                <span>Saving...</span>
              ) : (
                <>
                  <Save className='w-4 h-4' /> Save Changes
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;