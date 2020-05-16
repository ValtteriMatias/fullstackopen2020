import React, { useState } from 'react'
import Person from './components/Person'

const App = (props) => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '04005985657' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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


  return (
    <div>
      <h2>Phonebook</h2>
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
         {persons.map((person, i) =>
          <Person key={i} person={person} />
        )}
      
    </div>
  )

}

export default App