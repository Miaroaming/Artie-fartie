import React from 'react'
import { useNavigate } from 'react-router-dom'

const SinglePage = () => {
  const navigate = useNavigate()
  return (
    <>
    <button onClick={() => navigate(-1)}>Go back</button>
    <div className='single-craft'>
      Single Page
    </div>
    </>
  )
}

export default SinglePage
