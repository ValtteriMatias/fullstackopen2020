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



const App = (props) => {
  const [countries, setCountries] = useState([]) 
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState('1')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    axios
      .get('http://api.weatherstack.com/current?access_key=' + process.env.REACT_APP_API_key + '&query=helsinki')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data.current.temperature)
        setWeather(response.data.current.temperature)
      })
  }, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleClick = (country) => {
    setFilter(country.name)
    
  }

  const countriesToShow = countries.filter(country => country.name.toUpperCase().includes(filter.toUpperCase()))

  const Country10 = ({ country }) => {
    return (
      <p>
        {country.name} <button onClick={() => handleClick(country)}>show</button>
      </p>
    )
    
  }

  const handleWeatherChange = (props) => {
      axios
        .get('http://api.weatherstack.com/current?access_key=' + process.env.REACT_APP_API_key + '&query=helsinki')
        .then(response => {
          console.log('promise fulfilled')
          console.log(response.data.current.temperature)
          setWeather(response.data.current.temperature)
        })
  }
  
  const DisplayCountries = () => {
    if (countriesToShow.length > 10) {
      return('Too many matches, specify another filter')
    }
    if (countriesToShow.length > 1){
      return ( <div> {countriesToShow.map((country, i) => <Country10 key={i} country={country} />)} </div>) 
    }
    if (countriesToShow.length = 1){
    console.log(countriesToShow[0])
    axios
        .get('http://api.weatherstack.com/current?access_key=' + process.env.REACT_APP_API_key + '&query=berlin' )
        .then(response => {
          console.log('promise fulfilled')
          console.log(response.data.current.temperature)
          setWeather(response.data.current.temperature)
        })
    return ( <div> {countriesToShow.map((country, i) => <Country key={i} country={country} weather={weather} />) }</div>) 
    }

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