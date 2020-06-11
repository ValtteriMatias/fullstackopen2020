import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [newBlogLikes, setNewBlogLikes] = useState(0)
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: newBlogLikes
    }
  
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlogAuthor('')
        setNewBlogLikes(0)
        setNewBlogUrl('')
        setNewBlogTitle('')
        setBlogFormVisible(false)
        if (returnedBlog) {
          setErrorMessage(`Blog ${returnedBlog.title} was added succefully`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        
        }
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage(`Login succesful`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

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

  const loginForm = () => (
    <div>

    <form onSubmit={handleLogin}>
      <div>
      <h2>Login</h2>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
    </div>      
  )

  const handleClick = () => (
      setUser(null),
      window.localStorage.clear()
  )


  const blogsSchedule = () => {

    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

    return(
    <div>
      <p> {user.name} logged in </p> 
      <button onClick={handleClick}> Log out! </button>
      <br/>
      <br/>
      <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>Add Blog!</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            addBlog={addBlog}
            newBlogTitle={newBlogTitle}
            newBlogAuthor={newBlogAuthor}
            newBlogUrl={newBlogUrl}
            newBlogLikes={newBlogLikes}
            handleBlogTitleChange={handleBlogTitleChange}
            handleBlogAuthorChange={handleBlogAuthorChange}
            handleBlogUrlChange={handleBlogUrlChange}
            handleBlogLikesChange={handleBlogLikesChange}
          />

        <button onClick={() => setBlogFormVisible(false)}>cancel</button>
      </div>  
     <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
    )
  }

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ? 
      loginForm() :
      blogsSchedule()
    
      }
    </div>
  )

}

export default App