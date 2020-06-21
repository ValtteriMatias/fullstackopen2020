import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const vote = (id, content) => {
    const anecdote = anecdotes.find(n => n.id === id)
    const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    dispatch(voteAnecdote(id, changedAnecdote))
    dispatch(setNotification(`You voted: ${content}`, 5))

    }
    const anecdotesToShow = anecdotes.filter(x => x.content.toUpperCase().includes(filter.toUpperCase()) )


    return(
        <div>
            <h2>Anecdotes</h2>
            {anecdotesToShow.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )

}

export default AnecdoteList
