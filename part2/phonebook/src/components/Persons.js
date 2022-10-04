const Person = ({ person }) =>
  <div>{person.name} {person.number}</div>

const Persons = ({ persons, searchValue}) => {
  const personsToShow = persons.filter(person => {
      return person.name.toLowerCase().includes(searchValue.toLowerCase())
    }
  )
  return (personsToShow.map(person =>
      <Person key={person.id} person={person} />
    )
  )
 }

 export default Persons