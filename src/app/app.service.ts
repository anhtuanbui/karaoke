import { IVideo } from './shared/models/video';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  apiUrl = 'https://www.googleapis.com/youtube/v3/search';
  // key = 'AIzaSyBlOS5B45a1_mYfwLHnD3575nJKrXJRiGY';
  // key = 'AIzaSyC24a97SQReUKtL4NglC-NiRPzZ7e44NU4';
  // key = 'AIzaSyCfKLdeVtFeWdY9ELBnKb9R05Vhnmw9_7s';
  key = 'AIzaSyBLhISEJMW_iDQ0g7qhBuYazoDToa1LALY';
  number = 10;

  // playlist: IVideo[] = [];
  // currentVideo?: IVideo;
  // currentVideoIndex:number = 0;
  next = false;

  constructor(private http: HttpClient) {}

  getVideos(query: string): Observable<any> {
    this.key = this.getKeyFromLocal()!;
    this.number = this.getNumberFromLocal();

    const url = `${this.apiUrl}?q=${query}&key=${this.key}&part=snippet&type=video&maxResults=${this.number}`;
    return this.http
      .get<IVideo>(url)
      .pipe(map((response: any) => response.items));
  }

  setPlaylistToLocal(playlist: any) {
    localStorage.setItem('playlist', JSON.stringify(playlist));
  }

  getPlaylistFromLocal() {
    return JSON.parse(localStorage.getItem('playlist')!);
  }

  setCurrentVideoToLocal(video: IVideo) {
    localStorage.setItem('current', JSON.stringify(video));
  }

  getCurrentVideoFromLocal() {
    return JSON.parse(localStorage.getItem('current')!);
  }

  removeVideoFromPlaylist(index: number) {
    let playlist = this.getPlaylistFromLocal();
    playlist.splice(index, 1);
    this.setPlaylistToLocal(playlist);
  }

  setNext(value: boolean) {
    this.next = value;
  }

  getNext() {
    return this.next;
  }

  clearStorage() {
    localStorage.removeItem('current');
    localStorage.removeItem('playlist');
  }

  setKeyToLocal(key: string) {
    localStorage.setItem('key', key);
  }

  getKeyFromLocal() {
    if(localStorage.getItem('key')){
      return localStorage.getItem('key');
    }
    return this.key;
  }

  setNumberOfResultToLocal(number: string) {
    localStorage.setItem('number', number);
  }

  getNumberFromLocal() {
    if (localStorage.getItem('number')) {
      return parseInt(localStorage.getItem('number')!);
    }
    return this.number;
  }
}
