import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
          filter shown with 
          <input 
            value={props.value}
            onChange={props.onChange}
          />
    </div>
  )
}

const PersonForm = (props) => {
  
  return(
    <form onSubmit={props.onSubmit}>
        <div>
          name:
          <input 
            value={props.name}
            onChange={props.onNameChange}
          />
        </div>
        <div>
          number:
          <input 
            value={props.number}
            onChange={props.onNumberChange}
          />
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({filter, persons}) => {
  
  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase()
             .includes(filter.toLowerCase()))

  return(
    personsToShow.map(person => <li key={person.name}>{person.name} {person.number}</li>)
  )
}

const App = () => {
  
  const [ persons, setPersons] = useState([])

  const [ newFilter, setNewFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')


  const addContact = (event) => {
    event.preventDefault()
    if(persons.filter(person => person.name === newName).length > 0)
    {
      alert(`${newName} is already added to phonebook`)
    }
    else
    {
      setPersons(persons.concat({ name : newName, number : newNumber }))
      
      const personObject = {
        name: newName,
        number: newNumber,
        //date: new Date().toISOString(),
        //important: Math.random() > 0.5,
      }

      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        console.log(response)
      })
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value = {newFilter} onChange={handleFilterChange} />

      <h3> Add a new</h3>

      <PersonForm
        onSubmit={addContact}
        name={newName}
        number={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}/>

      <h3>Numbers</h3>

      <Persons filter={newFilter} persons={persons} />
    </div>
  )

}

export default App