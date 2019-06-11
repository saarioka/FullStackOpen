import React, { useState } from 'react'

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
  
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

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

  const addContact = (event) => {
    event.preventDefault()
    if(persons.filter(person => person.name === newName).length > 0)
    {
      alert(`${newName} is already added to phonebook`)
    }
    else
    {
      setPersons(persons.concat(
                    { name : newName, number : newNumber }))
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