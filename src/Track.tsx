import type { ITrack } from "./ITrack";


export class Track implements ITrack {
    public id: number;
    public title: string;
    public artist: string;
    public cover: string;
    public file: string;
    public length: number;

    constructor(data: any) {
        if (typeof data.id !== "number" ||
            typeof data.title !== "string" ||
            typeof data.artist !== "string" ||
            typeof data.cover !== "string" ||
            typeof data.file !== "string" ||
            typeof data.length !== "number") {
            throw new Error("Invalid track data");
        }

        this.id = data.id;
        this.title = data.title;
        this.artist = data.artist;
        this.cover = data.cover;
        this.file = data.file;
        this.length = data.length;
    }

    public play(): void {
        
    }
}
