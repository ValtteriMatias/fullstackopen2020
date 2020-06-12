import React, { useState } from 'react'

const BlogForm = ({
  addBlog
}) => {

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [newBlogLikes, setNewBlogLikes] = useState(0)

  const handleBlogTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }

  const handleBlogAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }

  const handleBlogUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }

  const handleBlogLikesChange = (event) => {
    setNewBlogLikes(event.target.value)
  }

  const createBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: newBlogLikes
    }
    addBlog(blogObject)
    setNewBlogAuthor('')
    setNewBlogLikes(0)
    setNewBlogUrl('')
    setNewBlogTitle('')

  }

  return (
    <div>
      <form onSubmit={createBlog}>
        <p>Title</p>
        <input
          id='title'
          value={newBlogTitle}
          onChange={handleBlogTitleChange}
        />
        <p>Author</p>
        <input
          id='author'
          value={newBlogAuthor}
          onChange={handleBlogAuthorChange}
        />
        <p>Url</p>
        <input
          id='url'
          value={newBlogUrl}
          onChange={handleBlogUrlChange}
        />
        <p>Likes</p>
        <input
          id='likes'
          value={newBlogLikes}
          onChange={handleBlogLikesChange}
        />
        <br/>
        <br/>
        <button type="submit">save</button>
      </form>
    </div>
  )
}


export default BlogForm


