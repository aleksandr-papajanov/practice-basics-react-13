import { useEffect, useState, type ReactElement } from "react"
import { Playlist } from "./Playlist"
import { CurrentTrack } from "./CurrentTrack"
import type { DataProvider } from "../DataProvider"

interface MediaPlayerProps {
  dataProvider: DataProvider
}

export const MediaPlayer = (props: MediaPlayerProps): ReactElement => {
  const [currentTrack, setCurrentTrack] = useState(props.dataProvider.currentTrack);
  const [isShuffle, setIsShuffle] = useState(props.dataProvider.shuffle);
  const [isRepeat, setIsRepeat] = useState(props.dataProvider.repeat);

  // synchronize with data provider
  useEffect(() => {
    props.dataProvider.currentTrack = currentTrack;
  }, [currentTrack, props.dataProvider]);

  useEffect(() => {
    props.dataProvider.shuffle = isShuffle;
  }, [isShuffle, props.dataProvider]);

  useEffect(() => {
    props.dataProvider.repeat = isRepeat;
  }, [isRepeat, props.dataProvider]);

  return (
    <div className="media-player">
        <header>
            <button><span className="material-symbols-outlined">arrow_back_ios</span></button>
            <h1>{props.dataProvider.currentPlaylist.title}</h1>
            <button><span className="material-symbols-outlined">more_vert</span></button>
        </header>

        <div className="content">
          <Playlist tracks={props.dataProvider.tracks}
                    currentTrack={currentTrack}
                    onSelectTrack={setCurrentTrack} />  

          <CurrentTrack track={currentTrack}
                        isShuffle={isShuffle}
                        isRepeat={isRepeat}
                        onNext={() => isRepeat ? setCurrentTrack(currentTrack) : setCurrentTrack(props.dataProvider.nextTrack)}
                        onPrevious={() => isRepeat ? setCurrentTrack(currentTrack) : setCurrentTrack(props.dataProvider.previousTrack)}
                        onShuffle={setIsShuffle}
                        onRepeat={setIsRepeat} />
        </div>
    </div>
  )
}