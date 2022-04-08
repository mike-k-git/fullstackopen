const PersonForm = (props) => {
  const {
    newName,
    newNumber,
    handleSubmit,
    handleNewNameChange,
    handleNewNumberChange,
  } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNewNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNewNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
