import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
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
      <h2>statistics</h2>
      <p>good {good} <br /> neutral {neutral} <br /> bad {bad} </p> 
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)