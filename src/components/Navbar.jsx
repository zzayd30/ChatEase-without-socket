import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link, Navigate } from 'react-router-dom'
import { MessageSquare, Settings, User, LogOut } from 'lucide-react'
import Logo from "../../public/logo.png"
import Theme from "../../public/theme.png"

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  return (
    <header
      className="bg-base-100 border-b border-base-300 backdrop-blur-lg bg-base-100/80 fixed w-[90vw] md:w-[89vw] lg:w-[95vw] top-0 z-40 "
    >
      <div className="container h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <img src={Logo} alt="Logo" className='w-5 h-5 hover:scale-150 transition ease-linear' />
              </div>
              <h1 className="text-lg font-bold">ChatEase</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`
              btn btn-sm gap-2 transition-colors
              
              `}
            >
              <img src={Theme} alt="Theme Icon" className='w-5 h-5' />
              <span className="hidden sm:inline">Themes</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
