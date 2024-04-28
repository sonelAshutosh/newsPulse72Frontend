import React, { useEffect, useState } from 'react'
import Link from 'next/link.js'
import Tick from '@/svg/tick.js'
import LikeIcon from '@/svg/likeIcon.js'
import SaveIcon from '@/svg/saveIcon.js'
import SourceIcon from '@/svg/sourceIcon.js'
import DisLikeIcon from '@/svg/dislikeIcon.js'
import CommentIcon from '@/svg/commentIcon'
import Cookies from 'js-cookie'
import axios from '../axios.jsx'
import CommentContainer from './CommentContainer.js'

function VerticalScrollableCards({ article }) {
  const userId = Cookies.get('userId')
  const [isLiked, setIsLiked] = useState(false)
  const [likedLength, setLikedLength] = useState(article.likes?.length)
  const [isSaved, setIsSaved] = useState(false)
  const [dislikedLength, setDisLikedLength] = useState(article.disLikes?.length)
  const [isDisliked, setIsDisliked] = useState(false)

  const [isCommentOpen, setIsCommentOpen] = useState(false)

  useEffect(() => {
    async function checkUserSaved() {
      try {
        if (userId) {
          const res = await axios.get(
            `users/user/${userId}/isSaved/${article._id}`
          )
          const { saved } = await res.data
          setIsSaved(saved)
        }
      } catch (err) {
        console.log(err)
      }
    }
    checkUserSaved()

    const isUserLiked = article.likes.some((like) => like === userId)
    const isUserDisliked = article.disLikes.some(
      (dislike) => dislike === userId
    )

    setIsLiked(isUserLiked)
    setIsDisliked(isUserDisliked)
  }, [article.likes, article.disLikes, userId])

  const handleSaveClick = async () => {
    try {
      if (userId) {
        const res = await axios.post(`users/user/${userId}/save/${article._id}`)
        const { message } = await res.data
        if (message === 'Article Saved') {
          setIsSaved(true)
        } else if (message === 'Article Deleted') {
          setIsSaved(false)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleLikeClick = async () => {
    try {
      if (userId) {
        const res = await axios.post(`news/${article._id}/like/${userId}`)
        const { message, likesCount, disLikesCount } = await res.data
        if (message === 'News Liked') {
          setIsLiked(true)
          setLikedLength(likesCount)
          setDisLikedLength(disLikesCount)
          setIsDisliked(false)
        } else if (message === 'News Unliked') {
          setIsLiked(false)
          setLikedLength(likesCount)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleDisLikeClick = async () => {
    try {
      if (userId) {
        const res = await axios.post(`news/${article._id}/dislike/${userId}`)
        const { message, likesCount, disLikesCount } = await res.data
        if (message === 'News Disliked') {
          setIsDisliked(true)
          setDisLikedLength(disLikesCount)
          setIsLiked(false)
          setLikedLength(likesCount)
        } else if (message === 'Dislike Removed') {
          setIsDisliked(false)
          setDisLikedLength(disLikesCount)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleCommentOpen = () => {
    setIsCommentOpen(true)
    // console.log(isCommentOpen)
  }

  return (
    <div className="snap-start snap-always relative">
      <div className="bg-gray-800 h-[100vh] flex flex-col">
        <img src={article.imageURL} alt={article.title} />
        <div className="flex gap-1 place-items-center pr-4">
          <h2 className="text-lg leading-tight font-semibold pt-4 pb-2 px-4 text-justify">
            {article.title}
          </h2>
          <div
            className={
              article.isVerified
                ? 'text-green-500 flex flex-col gap-2 place-content-center'
                : 'text-red-500 flex flex-col gap-2 place-content-center'
            }
          >
            <Tick />
            <Link
              href={article.sourceURL}
              className="text-blue-600 hover:text-blue-700"
            >
              <SourceIcon />
            </Link>
          </div>
        </div>
        <div className="border border-gray-400 mx-4"></div>
        {/* BREAK LINE */}
        <div className="flex justify-between text-xs px-4">
          <div className="text-gray-500 ">
            {article.category.map((category) => category.toUpperCase() + '  ')}
          </div>
          <div className="text-gray-500">
            {new Date(article.createdAt).toLocaleString()}
          </div>
        </div>
        <div className="border border-gray-400 mx-4"></div>
        {/* BREAK LINE */}
        <p className="px-4 p-2 h-[35vh] text-justify overflow-y-auto">
          {article.summary}
        </p>
        <div className="w-full flex justify-between relative px-4 py-4">
          <div
            className={`px-4 justify-between place-items-center ${
              isLiked ? 'text-green-500' : 'text-gray-500'
            }`}
            onClick={handleLikeClick}
          >
            <LikeIcon />
            <span className="px-4">{likedLength}</span>
          </div>
          <div
            className={`px-4 justify-between place-items-center ${
              isDisliked ? 'text-red-500' : 'text-gray-500'
            }`}
            onClick={handleDisLikeClick}
          >
            <DisLikeIcon />
            <span className="px-4">{dislikedLength}</span>
          </div>
          <div
            className={`px-4 ${isSaved ? 'text-blue-600' : 'text-gray-500'}`}
            onClick={handleSaveClick}
          >
            <SaveIcon />
          </div>
          <div className="px-4" onClick={handleCommentOpen}>
            <CommentIcon />
          </div>
        </div>
      </div>
      <CommentContainer
        isCommentOpen={isCommentOpen}
        setIsCommentOpen={setIsCommentOpen}
        articleId={article._id}
      />
    </div>
  )
}

export default VerticalScrollableCards
