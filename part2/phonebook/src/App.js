import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons))
  }, [])

  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  )

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setNewName('')
    setNewNumber('')

    const newPerson = { name: newName, number: newNumber }
    const isExist = persons.some((p) => p.name === newName)

    if (isExist) {
      const ok = window.confirm(
        `A user with the name '${newName}' already exist. Do you want to change the number to '${newNumber}'?`
      )
      if (ok) {
        const person = persons.find((p) => p.name === newName)
        personService.update(person.id, newPerson).then((updatedPerson) => {
          setPersons(
            persons.map((p) => (p.id !== updatedPerson.id ? p : updatedPerson))
          )
          showNotification(`Updated ${updatedPerson.name}`, 'success')
        })
      }
    } else {
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          showNotification(`Added ${returnedPerson.name}`, 'success')
        })
        .catch((error) => {
          showNotification(error.response.data.error, 'error')
        })
    }
  }

  const showNotification = (text, type) => {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 3000)
  }

  const handleDeleteOf = (id) => {
    const removePerson = persons.find((p) => p.id === id)
    const isConfirmed = window.confirm(`Delete ${removePerson.name}?`)

    if (isConfirmed) {
      personService
        .remove(id)
        .then(() => setPersons(persons.filter((p) => p.id !== id)))
        .catch((error) => {
          showNotification(
            `Error: the person with id '${id}' was already deleted from the server`,
            'error'
          )
        })
      setPersons(persons.filter((p) => p.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        handleNewNameChange={handleNewNameChange}
        handleNewNumberChange={handleNewNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <>
        {filteredPersons.length
          ? filteredPersons.map((person) => (
              <Person
                key={person.id}
                person={person}
                handleDelete={() => handleDeleteOf(person.id)}
              />
            ))
          : 'No Results'}
      </>
    </div>
  )
}

export default App
