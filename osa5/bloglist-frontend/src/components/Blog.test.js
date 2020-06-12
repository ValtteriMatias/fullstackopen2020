import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
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

  expect(component.container).toHaveTextContent(
    'www.testurl.com'
  )

  const element = component.container.querySelector('.allInfo')
  expect(element).toHaveStyle('display: none')
  
})