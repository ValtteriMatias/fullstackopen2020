import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
    const addBlog = jest.fn()
  
    const component = render(
      <BlogForm addBlog={addBlog} />
    )
  
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const likes = component.container.querySelector('#likes')
    const form = component.container.querySelector('form')
  
    fireEvent.change(title, { 
      target: { value: 'this is the title' } 
    })

    fireEvent.change(author, { 
        target: { value: 'sir author authorinen' } 
      })
    
    fireEvent.change(url, { 
      target: { value: 'www.testing.com' } 
    })

    fireEvent.change(likes, { 
        target: { value: 0 } 
      })

    fireEvent.submit(form)
  
    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('this is the title' )
    expect(addBlog.mock.calls[0][0].author).toBe('sir author authorinen' )
    expect(addBlog.mock.calls[0][0].url).toBe('www.testing.com' )
    expect(addBlog.mock.calls[0][0].likes).toBe(0)
  })