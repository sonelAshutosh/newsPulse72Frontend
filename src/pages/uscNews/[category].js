import VerticalScrollableCards from '@/components/VerticalScrollableCards.js'
import axios from '../../axios.jsx'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router.js'

function Category() {
  const router = useRouter()
  const { category } = router.query
  const [news, setNews] = useState([])

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await axios.get(`/news/category/${category}`)
        const data = await res.data
        const { news } = data
        setNews(news)
      } catch (error) {
        console.error(error)
      }
    }
    fetchNews()
  }, [])

  return (
    <div className="px-4 snap-mandatory snap-y overflow-auto h-screen  no-scrollbar">
      {news.map((article, index) => (
        <VerticalScrollableCards key={index} article={article} />
      ))}
    </div>
  )
}

export default Category
