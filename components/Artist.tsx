import * as d3 from 'd3'
import styled from 'styled-components'
import { useState } from 'react'
import Autocomplete from './styled/Autocomplete'
import ArtistDetails from './ArtistDetails'

type tracksType = {
    artist: string,
    date: string,
    track: string
}

type artistProps = {
    artists: tracksType,
    className: string
}

const Artist = ({ className, artists }: artistProps) => {
  const [artist, setArtist] = useState(null)
  const artistMap = d3.group(artists, (d) => d.artist)

  return (
    <div className={className}>
      <Autocomplete items={[...Array.from(artistMap, ([key]) => key)]} setValue={setArtist} />
      {artist ? (
        <ArtistDetails artist={artist} tracks={artistMap.get(artist)} />
      ) : <span>No artist selected</span>}
    </div>
  )
}

export default styled(Artist)``
