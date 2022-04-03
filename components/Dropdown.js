import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const Dropdown = props => {
  const { category, categoryFilters, setCategoryFilters, options } = props

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const dropdownButtonRef = useRef(null)
  const dropdownMenuRef = useRef(null)
  const lastDropdownInputRef = useRef(null)

  //Adding event listener when dropdown is open to detect click outside dropdown, then cleaning up event listener when closed
  useEffect(() => {
    if (!isDropdownOpen) return
    const handleClick = event => {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target) &&
        !dropdownButtonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false)
      } else setIsDropdownOpen(true)
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [isDropdownOpen])

  const handleBlur = event => {
    setIsDropdownOpen(false)
    dropdownButtonRef.current.focus()
  }

  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      setIsDropdownOpen(false)
      dropdownButtonRef.current.focus()
    }
  }

  const renderInputs = inputs =>
    inputs.map((input, index) => {
      const handleInputChange = event => {
        if (event.target.checked) setCategoryFilters(arr => [...arr, input])
        else if (!event.target.checked) {
          setCategoryFilters(categoryFilters.filter(item => item !== input))
        }
      }

      const checkedValue = categoryFilters
        .filter(item => item === input)
        .toString()

      return (
        <li key={input} className='dropdown-item'>
          <input
            onBlur={event =>
              input === inputs[inputs.length - 1] ? handleBlur(event) : null
            }
            onKeyDown={handleKeyDown}
            checked={checkedValue === input}
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
            ref={dropdownButtonRef}
            id={`dropdown-btn-${category}`}
            aria-controls={`content-${category}`}
            className='dropdown-toggle'
            aria-haspopup='true'
            aria-expanded={isDropdownOpen}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {category}
            <span
              aria-hidden='true'
              className={`img-container${isDropdownOpen ? ' active' : ''}`}
            >
              <Image
                src='/chevron-right.svg'
                alt=''
                height={20}
                width={20}
                layout='intrinsic'
              />
            </span>
          </button>
          <div
            ref={dropdownMenuRef}
            id={`dropdown-menu-${category}`}
            className={`dropdown-menu${isDropdownOpen ? ' active' : ''}`}
          >
            <ul>{options && renderInputs(options.sort())}</ul>
          </div>
        </div>
      </div>
    )
  )
}

export default Dropdown
