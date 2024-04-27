import VerticalScrollableCards from '@/components/VerticalScrollableCards.js'
import axios from '../../axios.jsx'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

function Index() {
  const [news, setNews] = useState([])
  const userId = Cookies.get('userId')

  useEffect(() => {
    async function fetchNews() {
      try {
        if (userId) {
          const res = await axios.get(`/news/${userId}/uscNews`)
          const data = await res.data
          const { news } = data
          setNews(news)
        }
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

export default Index
