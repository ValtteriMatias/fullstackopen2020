import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0,0,0,0,0,0])
  const [popular, setPopular] = useState(0)

  const random = () => {
      var maxNumber = anecdotes.length;
      var randomNumber = (Math.floor((Math.random() * maxNumber) + 1) -1);
    setSelected(randomNumber)
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1 
    setVotes(copy)
    highScore()
  }

  const highScore = () => {
    let biggest = 0;
      for (let i = 1; i < votes.length; i++ ) { 
        if ( votes[i] > votes[biggest] ) biggest = i;
      }
    setPopular(biggest)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {props.anecdotes[selected]} <br/> has {votes[selected]} votes
      <br/>
      <Button onClick={vote} text='vote' />
      <Button onClick={random} text='next anecdote' />
      <h2>Anecdote with the most votes</h2>
      {props.anecdotes[popular]} <br/> has {votes[popular]} votes

    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)