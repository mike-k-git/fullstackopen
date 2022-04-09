import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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

    const updatePerson = persons.find((p) => p.name === newName)
    const newPerson = { name: newName, number: newNumber }

    if (!updatePerson) {
      personService
        .create(newPerson)
        .then((returnedPerson) => setPersons(persons.concat(returnedPerson)))
    } else {
      const isConfirmed = window.confirm(
        `${newName} is already in added to phonebook, replace the old number with a new one?`
      )
      if (isConfirmed) {
        const id = updatePerson.id
        personService
          .update(id, newPerson)
          .then((returnedPerson) =>
            setPersons(persons.map((p) => (p.id !== id ? p : returnedPerson)))
          )
      }
    }

    setNewName('')
    setNewNumber('')
  }

  const handleDeleteOf = (id) => {
    const removePerson = persons.find((p) => p.id === id)
    const isConfirmed = window.confirm(`Delete ${removePerson.name}?`)

    if (isConfirmed) {
      personService
        .remove(id)
        .then(() => setPersons(persons.filter((p) => p.id !== id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
