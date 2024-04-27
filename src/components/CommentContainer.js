import CloseIcon from '@/svg/closeIcon'
import Tick from '@/svg/tick'
import React, { useState } from 'react'
import Comment from './Comment'

function CommentContainer({ isCommentOpen, setIsCommentOpen, articleId }) {
  const [comments, setComments] = useState([])
  const handleCommentClose = () => {
    setIsCommentOpen(false)
  }
  const handleCommentFormSubmit = (e) => {
    e.preventDefault()

    const data = new FormData()
  }

  return (
    <div
      className={
        isCommentOpen
          ? 'absolute h-[72vh] w-full left-0 bg-gray-700  transition-all duration-300 ease-in-out z-5 block top-[28vh] rounded-tr-lg rounded-tl-lg'
          : 'absolute h-[72vh] w-full left-0 bg-gray-700  transition-all duration-300 ease-in-out z-5 hidden top-[110vh]'
      }
    >
      <div className="p-4 flex justify-end" onClick={handleCommentClose}>
        <div className="m-auto ml-0 text-xl font-bold tracking-wider">
          Comments
        </div>
        <CloseIcon />
      </div>
      <div className="border border-gray-500"></div>
      <div className="p-4">
        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </div>

      <div className="absolute bottom-0 w-full h-20 bg-gray-800 flex place-content-center place-items-center">
        <form
          className="flex place-content-center place-items-center"
          onSubmit={handleCommentFormSubmit}
        >
          <textarea
            name="comment"
            id="comment"
            cols="40"
            rows="2"
            className="border border-gray-300 bg-gray-700 rounded-xl resize-none px-2"
          ></textarea>
          <button className="p-2" type="submit">
            <Tick />
          </button>
        </form>
      </div>
    </div>
  )
}

export default CommentContainer
