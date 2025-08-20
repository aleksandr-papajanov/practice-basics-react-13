import { useState, useEffect } from "react"
import type { ReactElement } from "react"
import type { Track } from "../Track"

interface CurrentTrackProps{
  track: Track,
  isShuffle: boolean,
  isRepeat: boolean,
  onNext: () => void,
  onPrevious: () => void,
  onShuffle: (value: boolean) => void
  onRepeat: (value: boolean) => void
}

export const CurrentTrack = (props: CurrentTrackProps): ReactElement => {
  const { track, isShuffle, isRepeat, onNext, onPrevious, onShuffle, onRepeat } = props;

  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: number | null = null

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((time) => {
          if (time + 1 >= track.length) {
            setIsPlaying(false);
            onNext();
            return 0;
          }
          
          return time + 1;
        })
      }, 1000)
    }

    return () => {
      if (interval !== null)
        clearInterval(interval)
    }
  }, [isPlaying, track, onNext])

  useEffect(() => {
    setCurrentTime(0)
    setIsPlaying(true)
  }, [track])

  const handlePlay = () => setIsPlaying(true)
  const handlePause = () => setIsPlaying(false)

  return (
    <section className="current-track">
      <img src={track.cover} alt={track.title} />

      <section className="row info">
        <button><span className="material-symbols-outlined">add_circle</span></button>
        <div className="details">
          <span className="title">{track.title}</span>
          <span className="artist">{track.artist}</span>
        </div>
        <button><span className="material-symbols-outlined">favorite</span></button>
      </section>

      <section className="row progress">
        <span className="current-time">{formatTime(currentTime)}</span>
        <input type="range"
               min={0}
               max={track.length}
               value={currentTime}
               onChange={e => setCurrentTime(Number(e.target.value))} />
        <span className="total-time">{formatTime(track.length)}</span>
      </section>

      <section className="row controls">
        <section>
          <button onClick={() => onRepeat(!isRepeat)}>
            <span className="material-symbols-outlined">{isRepeat ? "repeat_one" : "repeat"}</span>
          </button>
        </section>

        <section className="main">
          <button onClick={onPrevious}><span className="material-symbols-outlined">fast_rewind</span></button>

          {isPlaying ? (
            <button className="play" onClick={handlePause}><span className="material-symbols-outlined">pause</span></button>
          ) : (
            <button className="play" onClick={handlePlay}><span className="material-symbols-outlined">play_arrow</span></button>
          )}
          <button onClick={onNext}><span className="material-symbols-outlined">fast_forward</span></button>
        </section>

        <section>
          <button onClick={() => onShuffle(!isShuffle)}>
            <span className="material-symbols-outlined">{isShuffle ? "shuffle" : "arrows_outward"}</span>
          </button>
        </section>
      </section>
    </section>
  )
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}