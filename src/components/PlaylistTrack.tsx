import type { Track } from "../Track";

interface PlaylistTrackProps {
  track: Track;
  isPlaying: boolean;
  onSelectTrack: (trackId: Track) => void;
}

export const PlaylistTrack = (props: PlaylistTrackProps) => {
  

  return (
    <li className={`track ${props.isPlaying ? "playing" : ""}`} key={props.track.id}>
        <img src={props.track.cover} alt={props.track.title} />
        <div className="track-info">
          <span className="title">{props.track.title}</span>
          <span className="artist">{props.track.artist}</span>
        </div>
        <button onClick={() => props.onSelectTrack(props.track)}>
          <span className="material-symbols-outlined">play_circle</span>
        </button>
    </li>
  )
}
