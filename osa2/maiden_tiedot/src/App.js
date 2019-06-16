import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
          find countries 
          <input 
            value={props.value}
            onChange={props.onChange}
          />
    </div>
  )
}

const Countries = ({filter, countries, show}) => {
  const countriesToShow = filter === ''
    ? countries
    : countries.filter(country => country.name.toLowerCase()
               .includes(filter.toLowerCase()))

  if(countriesToShow.length > 10){
    return "Too many matches, specify another filter"
  }
  else if(countriesToShow.length === 1){
    const match = countriesToShow[0]
    return(
      <div>
        <h2>{match.name}</h2>
        capital {match.capital}<br/>
        population {match.population}
        <h3>languages</h3>
        <ul>
          {
            match.languages.map(language =>
              <li key={language.name}>
                {language.name}
              </li>
            )
          }
        </ul>
        <img 
          src={match.flag}
          height="100"
        />
      </div>
    )
  }
  return(
    countriesToShow.map(country =>
    <li key={country.name}>
      {country.name} {country.number} <button onClick={() => show(country)}>show</button>
    </li>
    )
  )
}

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ newFilter, setNewFilter ] = useState('')

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Filter value = {newFilter} onChange={handleFilterChange} />
      <Countries filter={newFilter} countries={countries}/>
    </div>
  )

}

export default App