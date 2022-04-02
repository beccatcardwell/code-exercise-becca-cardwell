const Search = props => {
  const { setSearchQuery } = props
  const handleInputChange = event => {
    setSearchQuery(event.target.value)
  }
  return (
    <>
      <label htmlFor='search-input' className='sr-only'>
        Search media
      </label>
      <input
        id='search-input'
        name='media-search'
        type='search'
        placeholder='Search...'
        onChange={handleInputChange}
      />
      <span className='search-icon' aria-hidden='true' />
    </>
  )
}

export default Search
