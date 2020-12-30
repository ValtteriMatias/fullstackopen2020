import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import { setNotification } from './reducers/notificationReducer'
import { voteBlog, removeBlog, createBlog, initializeBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'


const App = () => {
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)



  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    dispatch(createBlog(blogObject))
    setBlogFormVisible(false)
    dispatch(setNotification(`Blog ${blogObject.title} was added succefully`, 5))
        
      
  }

  const deleteBlog = (blog) => {
    console.log(blog)

    if (window.confirm('Do you really want to delete ' + blog.title + '?')) {
      console.log('delete')
      dispatch(removeBlog(blog.id))
      dispatch(setNotification(`Deleted ${blog.title} `, 5))

    }

  }


  const updateBlog = (id) => {
    const blog = blogs.find(n => n.id === id)

    const changedBlog = { ...blog, likes: blog.likes + 1 }

    dispatch(voteBlog(id, changedBlog))
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
      dispatch(setNotification('Login succesful', 5))
    } catch (exception) {
      dispatch(setNotification('wrong credentials', 5))
    }
  }



  const loginForm = () => (
    <div>

      <form onSubmit={handleLogin}>
        <div>
          <h2>Login</h2>
        username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
        password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type="submit">login</button>
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
      <div id='blogs-schedule' >
        <p> {user.name} logged in </p>
        <button onClick={handleClick}> Log out! </button>
        <br/>
        <br/>
        <div style={hideWhenVisible}>
          <button id='add-blog' onClick={() => setBlogFormVisible(true)}>Add Blog!</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            addBlog={addBlog}
          />

          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
        <h2>blogs</h2>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog}  updateBlog={updateBlog} deleteBlog={deleteBlog}/>
        )}
      </div>
    )
  }


  return (
    <div>
      <Notification message={useSelector(state => state.notification)} />
      {user === null ?
        loginForm() :
        blogsSchedule()

      }
    </div>
  )

}

export default App