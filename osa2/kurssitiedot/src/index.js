import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
    return (
      <div>
        <h1>{props.course.name}</h1>
      </div>
    )
  }



const Content = (props) => {
    return (
      <div>
        {props.course.parts.map(part => 
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        )}
      </div>
    )
  }

  const Total = (props) => {
    let total = 0;
        for (let i = 0; i < props.parts.length; i++ ) { 
          total += props.parts[i].exercises
        }
    return (
      <div>
        <p>
         <b>total of {total} exercises</b>  
        </p>
      </div>
    )
  }

  const Course = (props) => {
    return (
      <div>
        <Header course={props.course} />
        <Content  course={props.course}/>
        <Total  parts= {props.course.parts} />
      </div>
    )
  }

  const App = () => {
    const course = {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }
  
    return (
      <div>
        <Course course={course} />
      </div>
    )
  }


ReactDOM.render(<App />, document.getElementById('root'))