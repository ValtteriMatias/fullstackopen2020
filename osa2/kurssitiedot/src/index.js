import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
    return (
      <div>
        <h2>{props.course.name}</h2>
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
    const reducer = (accumulator, currentValue) => accumulator + currentValue.exercises;
    let total = props.parts.reduce(reducer, 0);

    return (
      <div>
        <p>
         <b>total of {total} exercises</b>  
        </p>
      </div>
    )
  }

  const Courses = (props) => {
    return (
      <div>
        {props.courses.map(course => 
          <div key = {course.id}>
            {<Course course={course} />} 
          </div>
        )}
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
    const courses = [
      {
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
      }, 
      {
        name: 'Node.js',
        id: 2,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
      }
    ]
  
    return (
      <div>
        <h1>Web development curriculum</h1>
        <Courses courses={courses} />
      </div>
    )
  }


ReactDOM.render(<App />, document.getElementById('root'))