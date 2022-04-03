import React, { useState, useEffect } from 'react'

const Dropdown = props => {
  const { category, categoryFilters, setCategoryFilters, options } = props

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const renderInputs = inputs =>
    inputs.map(input => {
      const handleInputChange = event => {
        if (event.target.checked) setCategoryFilters(arr => [...arr, input])
        else if (!event.target.checked) {
          setCategoryFilters(categoryFilters.filter(item => item !== input))
        }
      }

      return (
        <li key={input} className='dropdown-item'>
          <input
            id={`input-${category}-${input}`}
            onChange={handleInputChange}
            type='checkbox'
            name={input}
          />
          <label htmlFor={`input-${category}-${input}`}>{input}</label>
        </li>
      )
    })

  return (
    category &&
    options && (
      <div className='dropdown'>
        <div className='dropdown-inner'>
          <button
            id={`dropdown-btn-${category}`}
            aria-controls={`content-${category}`}
            className='dropdown-toggle'
            aria-haspopup='true'
            aria-expanded={isDropdownOpen}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {category}
          </button>
          <ul
            id={`dropdown-menu-${category}`}
            className={`dropdown-menu${isDropdownOpen ? ' active' : ''}`}
          >
            {options && renderInputs(options.sort())}
          </ul>
        </div>
      </div>
    )
  )
}

export default Dropdown
