import type { ReactElement } from "react"
import { Track } from "../Track";
import { PlaylistTrack } from "./PlaylistTrack";

interface PlaylistProps
{
  tracks: Track[];
  currentTrack: Track;
  onSelectTrack: (trackId: Track) => void;
}

export const Playlist = (props: PlaylistProps): ReactElement => {
  return (
    <section className="playlist">
      <ul className="tracks">
        {props.tracks.map(t => (
          <PlaylistTrack key={t.id}
                         track={t}
                         isPlaying={t === props.currentTrack}
                         onSelectTrack={props.onSelectTrack} />
        ))}
      </ul>
    </section>
  )
}