import React, { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, updateBlog, deleteBlog }) => {

  const [show, setShow] = useState(false)

  const showWhenVisible = { display: show ? '' : 'none' }

  const label = show ? 'Hide' : 'Show'

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    marginBotttom: 10
  }
  const update = () => {
    updateBlog(blog.id)

  }
  const delBlog = () => {
    deleteBlog(blog)
  }


  return (
    <div id='blog' style={blogStyle}>
      {blog.title} {blog.author} <button id='show-hide-button' onClick={() => {setShow(!show)}}> {label}</button>
      <div style={showWhenVisible} className='allInfo'>
        {blog.url} <br/> <div id='likes-output'>{blog.likes}</div> <button id='like-button'onClick={update}> Like </button> <br/> <br/> <button onClick={delBlog}> Delete </button>
      </div>
    </div>
  )

}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
