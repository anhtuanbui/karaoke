export interface Id {
    kind: string;
    videoId: string;
}

export interface Default {
    url: string;
    width: number;
    height: number;
}

export interface Medium {
    url: string;
    width: number;
    height: number;
}

export interface High {
    url: string;
    width: number;
    height: number;
}

export interface Thumbnails {
    default: Default;
    medium: Medium;
    high: High;
}

export interface Snippet {
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: Date;
}

export interface IVideo {
    kind: string;
    etag: string;
    id: Id;
    snippet: Snippet;
}

export class Video {
    kind?: string;
    etag?: string;
    id?: Id;
    snippet?: Snippet;
}