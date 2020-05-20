import React from 'react'

const Country = ({ country }) => {
  console.log('koira')
  return (
    <div>
      <h2>{country.name} </h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <Languages languages={country.languages} />
      <img src={country.flag} style={{ height: 100}} alt="flag" />
    </div>
  )
}

export default Country


const Languages = ({ languages }) => {

  const listItems = languages.map((language) =>
    <li key={language.name} >{language.name}</li>
  );
  return (
      <ul>
        {listItems}
      </ul>
    )
}