import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'


const Filter = ( props ) => {
  return (
  <form>
      <div>
        find countries <input
          value={props.filter} 
          onChange={props.handleFilterChange} 
          />
      </div>
  </form>
  )
}

const Country10 = ({ country }) => {
  return (
    <div>
      <h2>{country.name} </h2>
    </div>
  )
}

const App = (props) => {
  const [ countries, setCountries] = useState([]) 
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  console.log('render', countries.length, 'notes')

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const countriesToShow = countries.filter(country => country.name.toUpperCase().includes(filter.toUpperCase()))
  
  const DisplayCountries = () => {
    if (countriesToShow.length > 10) {
      return('Too many matches, specify another filter')
    }
    if (countriesToShow.length > 1){
      return ( <div> {countriesToShow.map((country, i) => <Country10 key={i} country={country} />)} </div>) 
    }
    return ( <div> {countriesToShow.map((country, i) => <Country key={i} country={country} />)} </div>) 

  }

  return (
    <div>
      <div>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
      </div>
        <DisplayCountries />
      </div>
  )

}

export default App