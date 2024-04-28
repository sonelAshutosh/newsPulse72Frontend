import CloseIcon from '@/svg/closeIcon'
import Tick from '@/svg/tick'
import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import Cookies from 'js-cookie'
import axios from '../axios.jsx'
import { useRouter } from 'next/router'

function CommentContainer({ isCommentOpen, setIsCommentOpen, articleId }) {
  const router = useRouter()
  const userId = Cookies.get('userId')
  const [comments, setComments] = useState([])

  useEffect(() => {
    async function fetchComments() {
      const res = await axios.get(`/comments/comment/${articleId}`)
      const data = await res.data
      const { commentsById } = data
      setComments(commentsById)
    }

    fetchComments()
  }, [])
  const handleCommentClose = () => {
    setIsCommentOpen(false)
  }
  const handleCommentFormSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData(e.target)
    const commentContent = data.get('comment')

    try {
      if (userId) {
        const res = await axios.post('/comments', {
          content: commentContent,
          userId,
          newsId: articleId,
        })
        if (res.status === 200) {
          setComments([...comments, res.data.comment])
          // router.reload()
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  // console.log(comments)

  return (
    <div className="flex flex-col">
      <div
        className={
          isCommentOpen
            ? 'absolute h-[75vh] w-full left-0 bottom-0 bg-gray-700 transition-all duration-300 ease-in-out z-5 rounded-tr-lg rounded-tl-lg flex flex-col'
            : 'absolute h-[75vh] w-full left-0 bg-gray-700 transition-all duration-300 ease-in-out z-5 hidden -bottom-[62vh]'
        }
      >
        <div className="p-4 flex justify-end" onClick={handleCommentClose}>
          <div className="m-auto ml-0 text-xl font-bold tracking-wider">
            Comments
          </div>
          <CloseIcon />
        </div>
        <div className="border border-gray-500"></div>
        <div className="w-full bg-gray-700 flex place-content-center place-items-center my-4">
          <form
            className="flex place-content-center place-items-center"
            onSubmit={handleCommentFormSubmit}
          >
            <textarea
              name="comment"
              id="comment"
              cols="30"
              rows="2"
              className="border border-gray-300 bg-gray-700 rounded-xl resize-none px-2"
            ></textarea>
            <button className="px-2" type="submit">
              <Tick />
            </button>
          </form>
        </div>
        <div className="border border-gray-500"></div>
        <div className="p-4 overflow-y-auto h-[40vh] ">
          {comments?.map((comment, index) => (
            <Comment
              key={index}
              id={comment._id}
              content={comment.content}
              userId={comment.userId}
              createdAt={comment.createdAt}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CommentContainer
