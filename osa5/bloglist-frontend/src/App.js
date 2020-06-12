import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogFormVisible, setBlogFormVisible] = useState(false)
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

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setBlogFormVisible(false)
        if (returnedBlog) {
          setErrorMessage(`Blog ${returnedBlog.title} was added succefully`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)

        }
      })
  }

  const deleteBlog = (blog) => {

    if (window.confirm('Do you really want to delete ' + blog.title + '?')) {
      blogService
        .deleteBlog(blog.id)
        .then(
          setBlogs(blogs.filter(n => n.id !== blog.id))
        )
      setErrorMessage(
        `Deleted ${blog.title} `
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }


  const updateBlog = (id) => {
    const blog = blogs.find(n => n.id === id)

    const changedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(() => {
        setErrorMessage(
          `Note '${blog.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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
      setErrorMessage('Login succesful')
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
      <Notification message={errorMessage} />
      {user === null ?
        loginForm() :
        blogsSchedule()

      }
    </div>
  )

}

export default App