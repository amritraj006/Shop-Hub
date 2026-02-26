import React from 'react'

const Loading = () => {
  return (
    <div className='inset-0 fixed bg-white dark:bg-gray-700 flex justify-center items-center overflow-hidden'>
      <div className='h-14 w-14 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin'></div>
    </div>

  )
}

export default Loading