import React from 'react'

const Country = (props) => {
       

  return (
    <div>
      <h2>{props.country.name} </h2>
      <p>capital {props.country.capital}</p>
      <p>population {props.country.population}</p>
      <h3>languages</h3>
      <Languages languages={props.country.languages} />
      <img src={props.country.flag} style={{ height: 100}} alt="flag" />
      <h2>{props.weather}</h2>

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