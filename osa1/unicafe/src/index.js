import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = (props) => {
     return <p>good {props.good} <br /> 
      neutral {props.neutral} <br /> 
      bad {props.bad} <br /> 
      all  {props.allFeedback} <br/>
      average {props.average} <br/>
      positive {props.positive} % <br/>
      </p> 
}


const App = () => {
  // tallenna napit omaan tilaansa 
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allFeedback, setAll] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
  

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(allFeedback + 1)
    setTotal(total + 1)
    setAverage((total+1)/(allFeedback+1))
    setPositive((good/(allFeedback+1))*100)
    
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(allFeedback + 1)
    setAverage(total/(allFeedback+1))
    setPositive((good/(allFeedback+1))*100)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(allFeedback + 1)
    setTotal(total - 1)
    setAverage(total-1/(allFeedback+1))
    setPositive((good/(allFeedback+1))*100)
  }

  const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
  )

  return (
    <div>
      <h2>give feedback</h2>   
        <Button onClick={handleGoodClick} text='good' />
        <Button onClick={handleNeutralClick} text='neutral' />
        <Button onClick={handleBadClick} text='bad' />
        <Statistics good={good} bad={bad} neutral={neutral} allFeedback={allFeedback} average={average} positive={positive}   />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)