import * as d3 from 'd3'
import { useState } from 'react'
import styled from 'styled-components'
import Autocomplete from './styled/Autocomplete'
import ArtistDetails from './ArtistDetails'

type tracksType = {
    artist: string,
    date: string,
    track: string
}

type artistProps = {
    artists: tracksType,
    className: string,
    startDate: string
}

const Artist = ({
  className, artists, startDate, token,
}: artistProps) => {
  const [artist, setArtist] = useState(null)
  const artistMap = d3.group(artists, (d) => d.artist)

  return (
    <div className={className}>
      <div className="form">
        <span>When did you fist like</span>
        <Autocomplete items={[...Array.from(artistMap, ([key]) => key)]} setValue={setArtist} />
        <span>?</span>
      </div>
      {artist ? (
        <ArtistDetails artist={artist} tracks={artistMap.get(artist)} startDate={startDate} token={token} />
      ) : (
        <span style={{
          display: 'flex',
          justifyContent: 'center',
        }}
        >
          No artist selected
        </span>
      )}
    </div>
  )
}

export default styled(Artist)/* css */`
  .form {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 15px;
    align-items: flex-end;
  }
`
