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
  console.log(props.course.parts)
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

  // const Total = (props) => {
  //   return (
  //     <div>
  //       <p> Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  //     </div>
  //   )
  // }

  const Course = (props) => {
    return (
      <div>
        <Header course={props.course} />
        <Content  course={props.course}/>
        {/* <Total  parts= {props.course.parts} /> */}
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