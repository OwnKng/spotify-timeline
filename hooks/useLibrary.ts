import { useState, useEffect } from 'react'

export const useLibrary = (token: string) => {
  const [tracks, setTracks] = useState([])
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const getTracks = async (url: string) => {
    try {
      if (!url) {
        setLoading(false)
        return []
      }

      const resp = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const { items, next } = await resp.json()

      const itemsCleaned = items.map(({ added_at, track }) => {
        const date = added_at.substring(0, 10)
        return ({ date, name: track.name, artists: track.album.artists })
      })

      setTracks((prevState) => ([...prevState, ...itemsCleaned]))
      getTracks(next)
    } catch (err) {
      setError(err)
      setLoading(false)
    }
  }

  const getArtists = () => {
    const artistsArray: any[] = []

    tracks.map(({ name: track, date, artists }) => artists.map(({ name, id }) => {
      artistsArray.push({
        date, artist: name, artistId: id, track,
      })
    }))

    return { artistsArray }
  }

  useEffect(() => {
    getTracks('https://api.spotify.com/v1/me/tracks?limit=50')
  }, [])

  useEffect(() => {
    if (!error) {
      const { artistsArray } = getArtists()
      setArtists(artistsArray)
    }
  }, [loading])

  return {
    tracks, artists, loading, error,
  }
}
