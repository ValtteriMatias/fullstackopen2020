import React, {useState} from 'react'


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
    <div style={blogStyle}>
      {blog.title} <button onClick={() => {setShow(!show)}}> {label}</button>
      <div style={showWhenVisible}>
        {blog.author} <br/> {blog.url} <br/>{blog.likes} <button onClick={update}> Like </button> <br/> <br/> <button onClick={delBlog}> Delete </button>
       </div>
    </div>
  )
  
}

export default Blog
