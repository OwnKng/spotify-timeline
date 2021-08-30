type AddedTracksProps = {
    tracks: any[]
}

const AddedTracks = ({ tracks }: AddedTracksProps) => (
  <div>
    {tracks.map(({ name, artists }, i) => (
      <div key={`track-${i}`}>
        <h2>{name}</h2>
        {artists.map(({ name }, i) => (
          <span key={`track-artist-${name}-${i}`}>{name}</span>
        ))}
      </div>
    ))}
  </div>
)

export default AddedTracks
