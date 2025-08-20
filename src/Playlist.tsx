import type { IPlaylist } from "./IPlaylist";


export class Playlist implements IPlaylist {
    public id: number;
    public title: string;
    public tracks: number[];

    constructor(data: any) {
        if (typeof data.id !== "number" ||
            typeof data.title !== "string" ||
            !Array.isArray(data.tracks) ||
            !data.tracks.every((id: any) => typeof id === "number")) {
            throw new Error("Invalid playlist data");
        }

        this.id = data.id;
        this.title = data.title;
        this.tracks = data.tracks;
    }
}
