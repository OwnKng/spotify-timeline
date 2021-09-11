import { useState, useEffect } from 'react'

export const useLibrary = (token: string) => {
  const [tracks, setTracks] = useState([])
  const [artists, setArtists] = useState([])
  const [artistGenres, setArtistGenres] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingTracks, setLoadingTracks] = useState(true)
  const [error, setError] = useState(false)

  const getTracks = async (url: string) => {
    try {
      if (!url) {
        setLoadingTracks(false)
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
      setLoadingTracks(false)
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

  const getGenres = async (artistsArray: any[], i: number) => {
    const artistsFiltered = artists.slice(i, i + 50)

    if (!artistsFiltered.length) {
      setLoading(false)
      return []
    }

    const artistsWithGenres = artistsFiltered.map(({ artistId }) => (artistId)).join(',')

    try {
      const resp = await fetch(`https://api.spotify.com/v1/artists?ids=${artistsWithGenres}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const { artists } = await resp.json()
      const genres = artists.map(({ id, name, genres }) => ({ id, name, genres }))
      setArtistGenres((prevState) => ([...prevState, ...genres]))
      getGenres(artistsArray, i + 50)
    } catch (err) {
      setError(err)
    }
  }

  useEffect(() => {
    getTracks('https://api.spotify.com/v1/me/tracks?limit=50')
  }, [])

  useEffect(() => {
    if (!error) {
      const { artistsArray } = getArtists()
      setArtists(artistsArray)
    }
  }, [loadingTracks])

  useEffect(() => {
    if (!loadingTracks) {
      getGenres(artists, 0)
    }
  }, [artists])

  return {
    tracks, artists, artistGenres, loading, error,
  }
}
