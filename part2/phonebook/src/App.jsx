import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import Persons from './Components/Persons'
import PersonForm from './Components/PersonForm'
import Notification from './Components/Notification'
import personsService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(p => p.name === newName)

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )

      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber }

        personsService
          .update(existingPerson.id, updatedPerson)
          .then(response => {
            setPersons(persons.map(p =>
              p.id !== existingPerson.id ? p : response.data
            ))
            setNewName('')
            setNewNumber('')

            setMessage(`Updated ${response.data.name}`)
            setTimeout(() => setMessage(null), 5000)
          })
      }
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personsService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')

        setMessage(`Added ${response.data.name}`)
        setTimeout(() => setMessage(null), 5000)
      })
  }

  const handleDelete = (id, name) => {
    const ok = window.confirm(`Delete ${name}?`)
    if (!ok) return

    personsService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  const personsToShow = persons.filter(person =>
    person.name.includes(filter)
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />

      <Filter
        filter={filter}
        handleFilterChange={(e) => setFilter(e.target.value)}
      />

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        handleNumberChange={(e) => setNewNumber(e.target.value)}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
