const Filter = ({ searchValue, setNewSearchValue }) => {
  const hanldeNewSearch = (e) => { setNewSearchValue(e.target.value) }
 return <input value={searchValue} onChange={hanldeNewSearch}></input>
}

export default Filter