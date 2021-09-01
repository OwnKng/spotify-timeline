import { useState, useEffect } from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'
import { elevation } from './styled/util'

const ArtistCard = ({
  id, date, className, token,
}) => {
  const [state, setState] = useState()
  const [loading, setLoading] = useState(true)

  const getDetails = async () => {
    try {
      const resp = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const { name, images } = await resp.json()

      setState({
        name,
        img: images[2].url,
      })
      setLoading(false)
    } catch (err) {
      setState(null)
    }
  }

  useEffect(() => {
    getDetails()
  }, [id])

  return (
    <div className={className}>
      {!loading ? (
        <>
          <img src={state.img} />
          <div>
            <h4>{state.name}</h4>
            <p>
              Discovered on
              {' '}
              {d3.timeFormat('%d %b, %Y')(new Date(date))}
            </p>
          </div>
        </>
      ) : (
        <div />
      )}
    </div>
  )
}

export default styled(ArtistCard)/* css */`
    display: flex;
    align-items: center;
    padding: 1rem 0 1rem 10px;
    background: var(--color-foreground);
    ${elevation[1]};
    border-radius: 10px;
    gap: 5px;
    min-height: 80px;

    h4 {
      margin: 0px;
      color: var(--color-heading);
    }

    p {
      margin: 0px;
    }

    img {
        border-radius: 50%;
        width: 80px;
        height: 80px;
        object-fit: cover;
        ${elevation[2]};
    }
`
