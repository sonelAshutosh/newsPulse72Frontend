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
    console.log(navOpen)
  }

  const handleLogout = () => {
    Cookies.remove('userId')
    Cookies.remove('accessToken')
    router.replace('/')
  }

  return (
    <>
      <div className="flex place-items-center h-[10vh] mx-4 text-gray-400 sticky top-0 bg-black">
        <button onClick={handleNavClick}>
          <NavIcon />
        </button>
        <h1 className="font-bold text-2xl mx-8">NewsPulse 72</h1>
      </div>
      {navOpen ? (
        <div className="h-[82vh] w-full px-4 text-gray-300 bg-gray-800 absolute left-0 top-[10vh] overflow-scroll">
          <div className="py-4 flex place-content-center">
            <ProfileIcon />
            <div className="px-8">
              <h1>{userDetails.name}</h1>
              <h2>{userDetails.email}</h2>
              <h6>{userDetails._id}</h6>
            </div>
          </div>
          <Link href={'/allNews'} onClick={handleNavClick}>
            <div className="bg-gray-700 rounded-lg p-4 my-2">SEE ALL NEWS</div>
          </Link>
          <div className="bg-gray-700 rounded-lg p-4">
            <h1 className="font-bold text-2xl py-4">Categories - </h1>
            {userDetails.categories.map((category) => (
              <h1 key={category} className="font-semibold text-lg">
                {category.toUpperCase()}
              </h1>
            ))}
          </div>
          <div className="flex py-4 px-12">
            <Link
              href={'/selectCategories'}
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Change Categories
            </Link>
          </div>
          <div className="mx-12">
            <button
              onClick={handleLogout}
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Logout
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Navbar
