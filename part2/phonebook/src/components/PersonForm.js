import personService from '../services/persons'

const PersonForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber, setErrorMessage }) => {
  const addPerson = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    if (persons.some(person => person.name === newName)) {
      const existPerson = persons.find(person => person.name === newName)
      const existID = existPerson.id
      const changedPerson = {...existPerson, number: newNumber}
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(existID, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existID ? person : returnedPerson))
            setErrorMessage([
              `Replaced ${returnedPerson.name}'s phone number with ${newNumber}`,
              'notification'
            ])
            setTimeout(() => {
              setErrorMessage([null,null])
            }, 5000)          
          })
          .catch(error => {
            setErrorMessage([
              `Information of ${changedPerson.name} has already been removed on the server`,
              'error'
            ])
            setTimeout(() => {
              setErrorMessage([null,null])
            }, 5000)
            setPersons(persons.filter(person => person.id !== existID))
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setErrorMessage([
            `Added ${returnedPerson.name}`,
            'notification'
          ])
          setTimeout(() => {
            setErrorMessage([null,null])
          }, 5000);
        })
    }
  }

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm