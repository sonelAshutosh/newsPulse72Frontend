import axios from '../../axios.jsx'
import React, { useEffect, useState } from 'react'

const VerticalScrollableCards = ({ article }) => {
  return (
    <div className="snap-start snap-always">
      <div className="bg-gray-800 h-[92vh]">
        <img src={article.imageURL} alt={article.title} />
        <h2 className="text-lg font-semibold pt-4 px-4 text-justify">
          {article.title}
        </h2>
        <span className="px-4 text-gray-500">
          {article.category.map((category) => category.toUpperCase() + '  ')}
        </span>
        <p className="p-4 text-justify">{article.content}</p>
      </div>
    </div>
  )
}

function Index() {
  const [news, setNews] = useState([])

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await axios.get('/news')
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

export default Index
