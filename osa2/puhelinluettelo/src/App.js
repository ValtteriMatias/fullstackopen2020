import React, { useState } from 'react'
import Person from './components/Person'

const App = (props) => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('Ad')

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
        <form>
          <div>
            filter shown filter: <input
              value={filter} 
              onChange={handleFilterChange} 
              />
          </div>
        </form>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
            value={newName} 
            onChange={handleNameChange} 
            />
        </div>
          number: <input 
            value={newNumber} 
            onChange={handleNumberChange} 
            />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
      <h2>Numbers</h2>
         {numbersToShow.map((person, i) =>
          <Person key={i} person={person} />
        )}
      
    </div>
  )

}

export default App