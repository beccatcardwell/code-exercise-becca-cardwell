import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Fuse from 'fuse.js'

//component imports
import Dropdown from '../components/Dropdown'
import IndexPage from '../components/IndexPage'
import MediaItem from '../components/MediaItem'
import RadioInput from '../components/RadioInput'
import Search from '../components/Search'

export default function Home (props) {
  const [searchQuery, setSearchQuery] = useState(null)
  const [categoryFilters, setCategoryFilters] = useState([])

  console.log(`categoryFilters`, categoryFilters)
  // sorting media alphabetically by title
  const sortedMedia = props.data.media.sort((a, b) => {
    const titleA = a.title.toUpperCase()
    const titleB = b.title.toUpperCase()
    if (titleA < titleB) return -1
    if (titleA > titleB) return 1
    return 0
  })

  //Creating arrays of genres and years for their respective dropdowns
  let genres = []
  let years = []
  props.data.media.forEach(item => {
    item.genre.forEach(value => {
      const findGenre = genres.find(genre => genre === value)
      !findGenre && genres.push(value)
    })
    const findYear = years.find(year => year === item.year)
    !findYear && years.push(item.year)
  })

  const handleClearFilters = event => {
    setCategoryFilters([])
  }

  const renderMediaItems = items =>
    items
      //filter based on type
      .filter(item => {
        if (categoryFilters.length === 0) return item
        if (
          !categoryFilters.includes('book') &&
          !categoryFilters.includes('movie')
        )
          return item
        if (categoryFilters.includes(item.type)) return item
      })

      //filter basted on year
      .filter(item => {
        if (categoryFilters.filter(item => years.includes(item)).length === 0)
          return item
        if (categoryFilters.includes(item.year)) return item
      })

      //filter based on genre
      .filter(item => {
        if (categoryFilters.filter(item => genres.includes(item)).length === 0)
          return item

        if (categoryFilters.some(genre => item.genre.includes(genre)))
          return item
      })

      //filter based on search input value
      .filter(item => {
        if (searchQuery === null) return item
        else if (item.title.toLowerCase().includes(searchQuery.toLowerCase()))
          return item
      })

      .map(item => {
        //reformatting title so it works as element id used to aria-labelledby each media element
        const reformTitle = item.title
          .toLowerCase()
          .replace(/:/g, '')
          .replace(/,/g, '')
          .replace(/'/g, '')
          .replace(/ /g, '-')
        return (
          <MediaItem
            genre={item.genre}
            id={reformTitle}
            key={reformTitle}
            poster={item.poster}
            year={item.year}
            title={item.title}
            type={item.type}
          />
        )
      })

  return (
    <>
      <IndexPage />
      <header>
        <h1>Code Exercise - Becca Cardwell</h1>
      </header>
      <main>
        <div className='exercise-header'>
          <h2>Exercise 1 - Testimonial Block</h2>
        </div>

        <div>
          <div>
            <div>
              <p>
                Gingerbread tart cupcake cake muffin cookie liquorice tiramisu.
                Toffee cupcake cake cake croissant icing carrot cake cookie.
                Dessert chocolate bar apple pie sesame snaps liquorice carrot
                cake cookie danish.
              </p>
              <span>Indiana Jones, Archaeologist</span>
            </div>
            <a>Tell Me More</a>
          </div>
        </div>

        <div className='exercise-header'>
          <h2>Exercise 2 - Filterable Content</h2>
        </div>

        <div className='media-search-container'>
          <div className='media-search-header'>
            <div className='media-search-row'>
              <div className='dropdown-section'>
                <Dropdown
                  category='Genres'
                  categoryFilters={categoryFilters}
                  setCategoryFilters={setCategoryFilters}
                  options={genres}
                />
                <Dropdown
                  category='Year'
                  categoryFilters={categoryFilters}
                  setCategoryFilters={setCategoryFilters}
                  options={years}
                />
              </div>
              <div className='search-section'>
                <Search setSearchQuery={setSearchQuery} />
              </div>
            </div>

            <div className='media-search-row'>
              <div className='type-section'>
                <fieldset>
                  <legend>Media Type</legend>
                  <RadioInput
                    label='Movies'
                    type='movie'
                    categoryFilters={categoryFilters}
                    setCategoryFilters={setCategoryFilters}
                  />
                  <RadioInput
                    label='Books'
                    type='book'
                    categoryFilters={categoryFilters}
                    setCategoryFilters={setCategoryFilters}
                  />
                </fieldset>
              </div>
              <div className='clear-filters-section'>
                <button onClick={handleClearFilters}>Clear filters</button>
              </div>
            </div>
          </div>

          <div className='media-items' aria-live='polite'>
            {renderMediaItems(props.data.media)}
          </div>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps () {
  const res = await fetch(
    'https://raw.githubusercontent.com/HubSpotWebTeam/CodeExercise/main/src/js/data/data.json'
  )
  const data = await res.json()

  if (!res.ok) {
    throw new Error(`Failed to fetch posts, received status ${res.status}`)
  }

  return {
    props: {
      data
    }
  }
}
