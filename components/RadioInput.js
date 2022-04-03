import { useEffect } from 'react'

const RadioInput = props => {
  const { label, type, categoryFilters, setCategoryFilters } = props

  //add radio button value to the categoryFilters
  const handleInputChange = event => {
    if (type === 'book') {
      setCategoryFilters(arr => [...arr, 'book'])
    }
    if (type === 'movie') {
      setCategoryFilters(arr => [...arr, 'movie'])
    }
    return
  }

  //remove opposite radio button's value
  const handleClick = event => {
    if (type === 'book')
      setCategoryFilters(categoryFilters.filter(item => item !== 'movie'))
    if (type === 'movie')
      setCategoryFilters(categoryFilters.filter(item => item !== 'book'))
  }

  const checkedValue = categoryFilters.filter(item => item === type).toString()
  console.log(checkedValue)

  return (
    <>
      <div className='radio-container'>
        <input
          name='media-type'
          checked={checkedValue === type}
          onChange={handleInputChange}
          onClick={handleClick}
          value={type}
          id={`input-${type}`}
          type='radio'
        />
        <label htmlFor={`input-${type}`}>{label}</label>
      </div>
    </>
  )
}

export default RadioInput
