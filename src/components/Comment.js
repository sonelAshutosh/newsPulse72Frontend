import DeleteIcon from '@/svg/deleteIcon'
import EditIcon from '@/svg/editIcon'
import Tick from '@/svg/tick'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from '../axios.jsx'
import { useRouter } from 'next/router'

function Commment({ id, content, userId, createdAt }) {
  const router = useRouter()
  const loggedInUserId = Cookies.get('userId')

  const [editable, setEditAble] = useState(false)
  const [commentUser, setCommentUser] = useState({})
  const [currentlyEditing, setCurrentlyEditing] = useState(false)
  const [commentContent, setCommentContent] = useState(content)

  useEffect(() => {
    setEditAble(userId === loggedInUserId ? true : false)

    async function getCommentUser() {
      const res = await axios.get(`users/user/${userId}`)
      const data = res.data
      const { user } = data
      setCommentUser(user)
    }

    getCommentUser()
  }, [])

  const handleCommentEdit = () => {
    setCurrentlyEditing(!currentlyEditing)
  }

  const handleEditCommentChange = (e) => {
    setCommentContent(e.target.value)
  }

  const handleCommentUpdate = async () => {
    const res = await axios.put(`/comments/comment/${id}`, {
      content: commentContent,
    })
    const data = res.data
    setCurrentlyEditing(!currentlyEditing)
    if (res.status === 200) router.reload()
  }

  const handleCommentDelete = async () => {
    const res = await axios.delete(`comments/comment/${id}`)
    if (res.status === 201) router.reload()
  }

  return (
    <div
      key={id}
      className="border border-gray-200 bg-gray-800 rounded-lg py-2 px-4 my-2"
    >
      <div className="flex items-center">
        <h3 className="font-semibold tracking-wider">{commentUser.name}</h3>
        &nbsp;
        <div className="h-[4px] w-[4px] bg-gray-400 rounded-full" />
        &nbsp;
        <p className="text-gray-500">
          {new Date(createdAt).toLocaleDateString('en-US')}
        </p>
        {editable ? (
          <div
            className="ml-8 px-2 py-1 mx-2 cursor-pointer hover:text-gray-300 hover:bg-gray-600 rounded-lg"
            onClick={currentlyEditing ? handleCommentUpdate : handleCommentEdit}
          >
            {currentlyEditing ? <Tick /> : <EditIcon />}
          </div>
        ) : (
          <div></div>
        )}
        {editable ? (
          <div
            className="px-2 py-1 mx-2 cursor-pointerhover:text-gray-300hover:bg-gray-600 rounded-lg"
            onClick={handleCommentDelete}
          >
            <DeleteIcon />
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="font-normal">
        {currentlyEditing ? (
          <textarea
            className="border border-gray-300 bg-slate-800 rounded-xl resize-none p-2 px-4 my-2 w-full"
            value={commentContent}
            onChange={handleEditCommentChange}
          ></textarea>
        ) : (
          content
        )}
      </div>
    </div>
  )
}

export default Commment
