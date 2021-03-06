import React, { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Persons = ({filter, persons, remove}) => {
  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase()
             .includes(filter.toLowerCase()))

  return(
    personsToShow.map(person =>
    <li key={person.name}>
      {person.name} {person.number} <button onClick={() => remove(person)}>delete</button>
    </li>
    )
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={message.successful ? "success" : "error"}>
      {message.text}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newFilter, setNewFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

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
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
}, [])

  const addContact = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }

    const match = persons.filter(person => person.name === newName)

    if(match.length > 0){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personService
        .update(match[0].id, personObject)
        .then(() => {
          personService
          .getAll()
          .then(response => {
            setPersons(response.data)
            setNewName('')
            setNewNumber('')
          })
        })
        .catch(() => {
          setErrorMessage({ text : `Person '${newName}' was already removed from server`,
                            successful : false })
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
          setPersons(persons.filter(p => p.id !== personObject.id))
        })
        
        setErrorMessage({ text : `Edited ${newName}`, successful : true})
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      }
    }
    else{
      setPersons(persons.concat({ name : newName, number : newNumber }))
      personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
      setErrorMessage({ text : `Added ${newName}`, successful : true})
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const removeContact = (personObject) => {
    if(window.confirm(`Delete ${personObject.name}?`)){
      personService
      .remove(personObject)
      .then(() => {
        setPersons(persons.filter(p => p.id !== personObject.id))
      })
      setErrorMessage({ text : `Removed ${personObject.name}`, successful : true})
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={errorMessage}/>

      <Filter value = {newFilter} onChange={handleFilterChange} />

      <h3> Add a new</h3>

      <PersonForm
        onSubmit={addContact}
        name={newName}
        number={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}/>

      <h3>Numbers</h3>

      <Persons filter={newFilter} persons={persons} remove={removeContact}/>
    </div>
  )

}

export default App