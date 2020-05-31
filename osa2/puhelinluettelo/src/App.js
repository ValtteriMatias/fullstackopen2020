import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import personService from './services/persons'
import Notification from './components/Notification'
import ErrorMsg from './components/ErrorMsg'

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
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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
    const upNum = persons.filter((n => n.name === nameObject.name))
    if ( !( names.includes(newName) ) ) {
      personService
      .create(nameObject)
      .then(returnedName => {
        setPersons(persons.concat(returnedName))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log(error.response.data)
        setErrorMessage(error.response.data.error)
        setNotification(null)
      })
      console.log(errorMessage)
      setNotification(
        `Added j ${nameObject.name} `
      )
      setTimeout(() => {
        setErrorMessage(null)
        setNotification(null)
      }, 5000)
    }
    else {
      if (window.confirm(upNum[0].name + " is already added to phonebook, replace the old number with a new one?")){
      personService
      .update(upNum[0].id, nameObject)
      .then(response => {
        setPersons(persons.map(person => person.name !== nameObject.name ? person : response))
      })
      .catch(error => {
        setErrorMessage(
          `Information of '${upNum[0].name}' was already deleted from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        personService
          .deleteNumber(upNum[0].id)
          .then(returnedNote => {
            setPersons(persons.filter(n => n.id !== upNum[0].id))
          })
        
      })
      setNotification(
        `Updated ${nameObject.name}:s phonenumber! `
      )
      setTimeout(() => {
        setNotification(null)
      }, 5000) 

    }
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

  const handleClick = (person) => {
    if (window.confirm("Do you really want to delete " + person.name + "?")) { 
    personService
      .deleteNumber(person.id)
      .then(returnedNote => {
        setPersons(persons.filter(n => n.id !== person.id))
      })
      setNotification(
        `Deleted ${person.name} `
      )
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }

  }

  const numbersToShow = persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorMsg message={errorMessage} />
      <Notification message={notification} />
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
        {numbersToShow.map((person, i) => <Person key={i} person={person} handleClick={handleClick} />)}
    </div>
  )

}

export default App