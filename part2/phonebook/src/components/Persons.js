const Persons = ({ filteredPersons }) => {
  return (
    <>
      {filteredPersons.length
        ? filteredPersons.map((person) => (
            <div key={person.id}>
              {person.name} {person.number}
            </div>
          ))
        : 'No Results'}
    </>
  )
}

export default Persons
