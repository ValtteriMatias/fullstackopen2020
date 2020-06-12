import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    title: 'this is the title of the test blog component',
    author: 'this is the author of the test blog component',
    url:'www.testurl.com',
    likes: 3 
  }

  const component = render(
    <Blog blog={blog} />
  )


  expect(component.container).toHaveTextContent(
    'this is the title of the test blog component'
  )

  expect(component.container).toHaveTextContent(
    'this is the author of the test blog component'
  )

  const element = component.container.querySelector('.allInfo')
  expect(element).toHaveStyle('display:none')
  
})


test('clicking the button shows rest of info', async () => {
    const blog = {
        title: 'this is the title of the test blog component',
        author: 'this is the author of the test blog component',
        url:'www.testurl.com',
        likes: 3 
      }
  
    const component = render(
      <Blog blog={blog} />
    )

    const element1 = component.container.querySelector('.allInfo')
    expect(element1).toHaveStyle('display: none')

    const button = component.getByText('Show')
    fireEvent.click(button)
  

    const element2 = component.container.querySelector('.allInfo')
    expect(element2).not.toHaveStyle('display: none')
  
  
  })


  test('if liked twice the button eventhandler is called twice', async () => {
    const blog = {
        title: 'this is the title of the test blog component',
        author: 'this is the author of the test blog component',
        url:'www.testurl.com',
        likes: 3 
      }

    const mockHandler = jest.fn()
  
    const component = render(
      <Blog blog={blog} updateBlog={mockHandler} />
    )


    const button = component.getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)
    
    expect(mockHandler.mock.calls).toHaveLength(2)
  
  })
