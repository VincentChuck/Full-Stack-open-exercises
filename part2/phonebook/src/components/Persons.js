import personService from '../services/persons'

const Person = ({ person, deletePerson }) => {
    return (
      <div className='person'>
        {person.name} {person.number} &nbsp;
        <button onClick={deletePerson}>delete</button>
      </div>
    )
}

const Persons = ({ persons, searchValue, setPersons, setErrorMessage}) => {
  const personsToShow = persons.filter(person => {
      return person.name.toLowerCase().includes(searchValue.toLowerCase())
    }
  )
  const deletePerson = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setErrorMessage([
            `Deleted ${name}`,
            'notification'
          ])
          setTimeout(() => {
            setErrorMessage([null,null])
          }, 5000)
        })}
  }

  return (personsToShow.map(person =>
      <Person 
        key={person.id} 
        person={person} 
        deletePerson={()=>deletePerson(person.name, person.id)}
      />
    )
  )
 }

 export default Persons