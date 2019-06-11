import React, { useState } from 'react'

const App = () => {
  
  const [ persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: ''
    }
  ])

  const rows = () =>
    persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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
                    {
                      name : newName,
                      number : newNumber
                    }
                ))
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name:
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number:
          <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {rows()}
    </div>
  )

}

export default App