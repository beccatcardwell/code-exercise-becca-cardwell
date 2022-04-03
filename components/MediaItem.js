import React from 'react'
import Image from 'next/image'

const MediaItem = props => {
  const { id, title, year, poster, genre, type } = props
  console.log(`genre`, genre)
  const renderGenres = genres =>
    genres.map((genre, index) => {
      return (
        <span key={genre}>
          {genre}
          {index !== genres.length - 1 ? ', ' : ''}
        </span>
      )
    })

  return (
    <div
      aria-labelledby={`media-title-${id + '-' + year}`}
      className='media-item-container'
    >
      <div className='media-text'>
        <Image
          alt=''
          src={poster || 'http://placekitten.com/g/300/450'}
          onError={event => {
            event.target.src = 'https://placekitten.com/300/450'
            event.target.parentNode.className = 'img-error'
          }}
          placeholder='blur'
          blurDataURL
          width={300}
          height={400}
          layout='intrinsic'
          objectFit='contain'
          objectPosition='left top'
        />
        <h3 id={`media-title-${id + '-' + year}`}>
          {title} ({year})
        </h3>
        <p>Genre: {renderGenres(genre)} </p>
      </div>
    </div>
  )
}

export default MediaItem
