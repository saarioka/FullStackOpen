import React, { useState } from 'react'

const App = () => {
  
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])

const rows = () =>
  persons.map(person => <li key={person.name}>{person.name}</li>)

  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addNumber = (event) => {
    event.preventDefault()
  
    setPersons(persons.concat({name : newName}))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name:
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {rows()}
    </div>
  )

}

export default App