import axios from 'axios'
import { useState, useEffect } from 'react'
import loading from './loading.gif'

// const Country = ({ country }) =>
// <div>{country.name.common}</div>

// const Countries = ({ }) => {
//   const countryToShow = countries.filter(country => 
const Filter = ({ searchValue, setNewSearchValue }) => {
  const handleNewSearch = (e) => {
    setNewSearchValue(e.target.value)
  }
  return <input value={searchValue} onChange={handleNewSearch}></input>
}

const Country = ({ country }) => {
  const [showCountry, setShowCountry] = useState(false)
  const languages = Object.keys(country.languages).map(key =>
    <li key={key}>{country.languages[key]}</li>
  )

  return showCountry 
    ?(
      <div>
        <h2>
          {country.name.common} &nbsp;
          <button onClick={() => setShowCountry(!showCountry)}>hide</button>
        </h2>
        <div>
          capital {country.capital} <br />
          area {country.area}
        </div>
        <h3>languages:</h3>
        <ul>
          {languages}
        </ul>
        <img src={country.flags.png} width='200px' height='auto'></img>
      </div>
    )
    :(
      <div>
        {country.name.common} &nbsp;
        <button onClick={() => setShowCountry(!showCountry)}>show</button>
      </div>
    )
}

const OneCountry = ({ country }) => {
  const languages = Object.keys(country.languages).map(key =>
    <li key={key}>{country.languages[key]}</li>
  )
  return (
    <div>
      <h2>
        {country.name.common} 
      </h2>
      <div>
        capital {country.capital} <br/>
        area {country.area}
      </div>
      <h3>languages:</h3>
      <ul>
        {languages}
      </ul>
      <img src={country.flags.png} width='200px' height='auto' alt='loading'></img>
    </div>
  )
}

const Countries = ({ countries, searchValue }) => {
  const countriesToShow = countries.filter(country => 
    country.name.common.toLowerCase().includes(searchValue.toLowerCase())
  )
  if (countriesToShow.length > 10) {
    return <div>Too may matches, specify another filter</div>
  }
  if (countriesToShow.length > 1) {
    return (countriesToShow.map(country => 
      <Country 
        key={country.cca2} 
        country={country}
      />
    ))
  }
  if (countriesToShow.length = 1 && countriesToShow[0].hasOwnProperty('name')) {
    return <OneCountry country={countriesToShow[0]} />
  }
} 


function App() {
  const [countries, setCountries] = useState([]
    )
  const [searchValue, setNewSearchValue] = useState('')
  const [requestCompleted, setRequestCompleted] = useState(false)
  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
      .then(() => setRequestCompleted(true))
    }

  useEffect(hook, [])
  
   return requestCompleted
    ? (
      <div>
        find countries <Filter searchValue={searchValue} setNewSearchValue={setNewSearchValue} />
        <Countries countries={countries} searchValue={searchValue} />
      </div>
    )
    : (
      <div>
        <img src={loading} height='150px' width='auto' alt='loading'></img>
      </div>
    )
}

export default App;
