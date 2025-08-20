import { Playlist } from "./Playlist";
import { Track } from "./Track";

export class DataProvider {
    private _playlists: Playlist[];
    private _tracks: Track[];
    private _currentPlaylist: Playlist;
    private _currentTrack: Track;
    private _shuffle: boolean = false;
    private _repeat: boolean = false;

    constructor(data: any) {
        if (!Array.isArray(data.playlists))
            throw new Error("playlists must be array");

        this._playlists = data.playlists.map((p: any) => new Playlist(p));

        if (this._playlists.length === 0)
            throw new Error("playlists must not be empty");

        // set current playlist
        this._currentPlaylist = this._playlists[0];

        if (!Array.isArray(data.tracks))
            throw new Error("tracks must be array");

        this._tracks = data.tracks.map((t: any) => new Track(t));

        // set current track
        const track = this._tracks.find(track => track.id === this._currentPlaylist.tracks[0]);

        if (!track)
            throw new Error("Current track not found");

        this._currentTrack = track;
    }

    public set currentPlaylistId(current: Playlist) {
        if (this._currentPlaylist === current)
            return;

        if (!this._playlists.some(playlist => playlist === current))
            throw new Error("Playlist not found");

        this._currentPlaylist = current;
    }

    public set currentTrack(current: Track) {
        if (this._currentTrack === current)
            return;

        if (!this._tracks.some(track => track === current))
            throw new Error("Track not found");

        if (!this.currentPlaylist.tracks.includes(current.id))
            throw new Error("Track is not in the current playlist");

        this._currentTrack = current;
    }

    public get currentTrack(): Track {
        return this._currentTrack;
    }

    public get currentPlaylist(): Playlist {
        return this._currentPlaylist;
    }

    public get nextTrack(): Track {
        if (this._shuffle) {
            return this.getRandomTrack();
        }

        let nextIndex = 0;
        let index = this.currentPlaylist.tracks.findIndex(trackId => trackId === this._currentTrack.id);

        if (index === -1)
            throw new Error("Current track is not in the playlist");

        if (index + 1 < this.currentPlaylist.tracks.length)
            nextIndex = index + 1;

        const nextTrackId = this.currentPlaylist.tracks[nextIndex];
        const nextTrack = this._tracks.find(track => track.id === nextTrackId);

        if (!nextTrack)
            throw new Error("Next track not found");

        return nextTrack;
    }

    public get previousTrack(): Track {
        if (this._shuffle) {
            return this.getRandomTrack();
        }

        let previousIndex = this.currentPlaylist.tracks.length - 1;
        let index = this.currentPlaylist.tracks.findIndex(trackId => trackId === this._currentTrack.id);

        if (index === -1)
            throw new Error("Current track is not in the playlist");

        if (index - 1 >= 0)
            previousIndex = index - 1;

        const previousTrackId = this.currentPlaylist.tracks[previousIndex];
        const previousTrack = this._tracks.find(track => track.id === previousTrackId);

        if (!previousTrack)
            throw new Error("Previous track not found");

        return previousTrack;
    }

    private getRandomTrack(): Track {
        const randomIndex = Math.floor(Math.random() * this._tracks.length);
        return this._tracks[randomIndex];
    }

    public get shuffle(): boolean {
        return this._shuffle;
    }

    public set shuffle(value: boolean) {
        this._shuffle = value;
    }

    public get repeat(): boolean {
        return this._repeat;
    }

    public set repeat(value: boolean) {
        this._repeat = value;
    }

    public get tracks(): Track[] {
        return this.currentPlaylist.tracks.map(trackId => {
            const track = this._tracks.find(track => track.id === trackId);

            if (!track) throw new Error("Track not found");

            return track;
        });
    }
}
