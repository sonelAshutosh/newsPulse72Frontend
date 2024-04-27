import NavIcon from '@/svg/navIcon'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from '../axios.jsx'
import ProfileIcon from '@/svg/profileIcon.jsx'
import Link from 'next/link.js'
import { useRouter } from 'next/router.js'

function Navbar() {
  const router = useRouter()
  const userId = Cookies.get('userId')
  const [userDetails, setUserDetails] = useState({})
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        if (userId) {
          const res = await axios.get(`users/user/${userId}`)
          const data = await res.data
          const { user } = data
          setUserDetails(user)
        }
      } catch (err) {
        console.log(err)
      }
    }
    getUserDetails()
  }, [])

  //   console.log(userDetails)
  const handleNavClick = () => {
    setNavOpen(!navOpen)
    // console.log(navOpen)
  }

  const handleLogout = () => {
    Cookies.remove('userId')
    Cookies.remove('accessToken')
    router.replace('/')
  }

  return (
    <>
      <div className="flex place-items-center h-[7vh] mx-4 text-gray-400 sticky top-0 bg-black">
        <button onClick={handleNavClick}>
          <NavIcon />
        </button>
        <h1 className="font-bold text-2xl mx-8">NewsPulse 72</h1>
      </div>

      <div
        onClick={handleNavClick}
        className={
          navOpen
            ? 'absolute h-[100vh] w-full px-4 text-gray-300 bg-black left-0 top-[7vh] transition-all duration-300 ease-in-out z-10'
            : 'absolute h-[100vh] w-full px-4 text-gray-300 bg-black left-[-100%] transition-all duration-300 ease-in-out z-10'
        }
      >
        <div className="p-4 flex place-content-center bg-gray-900 rounded-lg">
          <div className="pr-4 pt-4">
            <ProfileIcon />
          </div>
          <div className="py-2">
            <h1 className="py-1">{userDetails.name}</h1>
            <h2 className="py-1">{userDetails.email}</h2>
            <h6 className="py-1">{userDetails._id}</h6>
          </div>
        </div>
        <Link href={'/allNews'} onClick={handleNavClick}>
          <div className="bg-gray-900 rounded-lg p-4 my-2 flex place-content-center font-extrabold">
            SEE ALL NEWS
          </div>
        </Link>
        <Link href={'/uscNews'} onClick={handleNavClick}>
          <div className="bg-gray-900 rounded-lg p-4 my-2 flex place-content-center font-extrabold">
            SEE ALL USER NEWS
          </div>
        </Link>
        <Link href={'/userSaved'} onClick={handleNavClick}>
          <div className="bg-gray-900 rounded-lg p-4 my-2 flex place-content-center font-extrabold">
            Saves
          </div>
        </Link>
        <div className="h-[35vh] bg-gray-900 rounded-lg p-4 overflow-y-auto relative">
          <h1 className="font-bold text-2xl py-2 top-0">Categories - </h1>
          {userDetails.categories?.map((category) => (
            <Link key={category} href={`uscNews/${category}`}>
              <h1
                key={category}
                className="font-semibold text-lg bg-slate-800 rounded-lg p-2 pl-8 m-2"
              >
                {category.toUpperCase()}
              </h1>
            </Link>
          ))}
        </div>
        <div className="flex py-4 gap-2">
          <Link
            href={'/selectCategories'}
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Change Categories
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  )
}

export default Navbar
