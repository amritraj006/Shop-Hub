import React, { useEffect } from 'react'
import assets from '../assets/assets'

const ThemeTogggleBtn = ({theme, setTheme, }) => {

    useEffect(() => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(theme || (prefersDarkMode ? 'dark' : 'light'));
    }, [])
    
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }

        localStorage.setItem('theme', theme);
    },[theme])
  return (
    <div className='hidden md:block'>
    <button>
        {theme === 'dark' ? (
            <img onClick={()=> setTheme('light')} src={assets.sun_icon} alt="" className='size-8 p-1.5 hover:scale-110 transition duration-300 border border-gray-500
            rounded-full'/>
        ) : (
            <img onClick={()=> setTheme('dark')} src={assets.moon_icon} alt="" className='size-8 p-1.5 hover:scale-110 transition duration-300 border border-gray-500
            rounded-full'/>
        )}
    </button>

    </div>
    
  )
}

export default ThemeTogggleBtn