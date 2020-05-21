import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'


const Filter = ( props ) => {
  return (
  <form>
      <div>
        filter shown filter: <input
          value={props.filter} 
          onChange={props.handleFilterChange} 
          />
      </div>
  </form>
  )
}


const PersonForm = (props) => {
  return (
  <form onSubmit={props.addName}>
        <div>
          name: <input
            value={props.newName} 
            onChange={props.handleNameChange} 
            />
        </div>
          number: <input 
            value={props.newNumber} 
            onChange={props.handleNumberChange} 
            />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const App = (props) => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  console.log('render', persons.length, 'notes')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    const names = persons.map((person) => person.name);
    if ( !( names.includes(newName) ) ) {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
      axios
        .post('http://localhost:3001/persons', nameObject)
        .then(response => {
          console.log(response)
    })
    }
    else {
      window.alert(`${newName} is already added to phonebook`);
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const numbersToShow = persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
        <PersonForm addName={addName} 
          newName = {newName} 
          handleNameChange = {handleNameChange} 
          newNumber = {newNumber} 
          handleNumberChange = {handleNumberChange} />
      <h2>Numbers</h2>
        {numbersToShow.map((person, i) => <Person key={i} person={person} />)}
    </div>
  )

}

export default App