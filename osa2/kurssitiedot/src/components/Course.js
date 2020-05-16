import React from 'react'

const Course = (props) => {
    return (
      <div>
        <Header course={props.course} />
        <Content  course={props.course}/>
        <Total  parts= {props.course.parts} />
      </div>
    )
  }

export default Course

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