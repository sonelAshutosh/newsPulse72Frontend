import React from 'react'
import axios from '../axios.jsx'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

function SelectCategories() {
  const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault()

    const userId = Cookies.get('userId')
    const formData = new FormData(e.target)
    const selectedCategories = Array.from(formData.getAll('category'))

    // console.log(userId, selectedCategories)

    try {
      const res = await axios.post(`users/user/${userId}/setUserCategories`, {
        categories: selectedCategories,
      })
      const data = await res.data
      if (data.message === 'User Categories Updated') {
        router.replace('/uscNews')
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="h-[92vh] flex place-content-center place-items-center">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className=" flex gap-4 px-4 py-2 rounded-lg m-1 bg-gray-800 text-gray-300 ">
          <input type="checkbox" name="category" value="politics" /> Politics
        </label>
        <label className=" flex gap-4 px-4 py-2 rounded-lg m-1 bg-gray-800 text-gray-300 ">
          <input type="checkbox" name="category" value="business" /> Business
        </label>
        <label className=" flex gap-4 px-4 py-2 rounded-lg m-1 bg-gray-800 text-gray-300 ">
          <input type="checkbox" name="category" value="technology" />{' '}
          Technology
        </label>
        <label className=" flex gap-4 px-4 py-2 rounded-lg m-1 bg-gray-800 text-gray-300 ">
          <input type="checkbox" name="category" value="science" /> Science
        </label>
        <label className=" flex gap-4 px-4 py-2 rounded-lg m-1 bg-gray-800 text-gray-300 ">
          <input type="checkbox" name="category" value="health" /> Health
        </label>
        <label className=" flex gap-4 px-4 py-2 rounded-lg m-1 bg-gray-800 text-gray-300 ">
          <input type="checkbox" name="category" value="sports" /> Sports
        </label>
        <label className=" flex gap-4 px-4 py-2 rounded-lg m-1 bg-gray-800 text-gray-300 ">
          <input type="checkbox" name="category" value="entertainment" />{' '}
          Entertainment
        </label>
        <label className=" flex gap-4 px-4 py-2 rounded-lg m-1 bg-gray-800 text-gray-300 ">
          <input type="checkbox" name="category" value="environment" />{' '}
          Environment
        </label>
        <label className=" flex gap-4 px-4 py-2 rounded-lg m-1 bg-gray-800 text-gray-300 ">
          <input type="checkbox" name="category" value="education" /> Education
        </label>
        <label className=" flex gap-4 px-4 py-2 rounded-lg m-1 bg-gray-800 text-gray-300 ">
          <input type="checkbox" name="category" value="travel" /> Travel
        </label>
        <label className=" flex gap-4 px-4 py-2 rounded-lg m-1 bg-gray-800 text-gray-300 ">
          <input type="checkbox" name="category" value="crime" /> Crime
        </label>
        <label className=" flex gap-4 px-4 py-2 rounded-lg m-1 bg-gray-800 text-gray-300 ">
          <input type="checkbox" name="category" value="weather" /> Weather
        </label>
        <button
          type="submit"
          className="w-full mt-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Choose Categories
        </button>
      </form>
    </div>
  )
}

export default SelectCategories

SelectCategories.getLayout = function PageLayout(page) {
  return <>{page} </>
}
