import { MatSnackBar } from '@angular/material/snack-bar';
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
  // key = 'AIzaSyBLhISEJMW_iDQ0g7qhBuYazoDToa1LALY';
  number = 20;
  key = 'AIzaSyBrO0VrW8bjDOSH9tJkL6oL7MVU6yb5cU8';

  keys = [
    'AIzaSyBlOS5B45a1_mYfwLHnD3575nJKrXJRiGY',
    'AIzaSyC24a97SQReUKtL4NglC-NiRPzZ7e44NU4',
    'AIzaSyCfKLdeVtFeWdY9ELBnKb9R05Vhnmw9_7s',
    'AIzaSyBLhISEJMW_iDQ0g7qhBuYazoDToa1LALY',
    'AIzaSyBrO0VrW8bjDOSH9tJkL6oL7MVU6yb5cU8',
    'AIzaSyBCj4OSHEHtSGAKhFdnZwhzFi5JeHUuEk8',
  ];

  states = ['paused', 'playing'];

  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

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

  clearStorage() {
    localStorage.removeItem('current');
    localStorage.removeItem('playlist');
    localStorage.removeItem('state');
  }

  setKeyToLocal(key: string) {
    localStorage.setItem('key', key);
  }

  getKeyFromLocal() {
    if (localStorage.getItem('key')) {
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

  openSnackbar(message: string) {
    this.snackbar.open(message, 'Close', {
      duration: 5000,
    });
  }

  getKeys() {
    return this.keys;
  }

  getKeyIndex() {
    return localStorage.getItem('keyIndex');
  }

  setKeyIndex(keyIndex: number) {
    localStorage.setItem('keyIndex', keyIndex.toString());
  }

  setVideoState(state: string) {
    localStorage.setItem('state', state);
  }

  getVideoState() {
    return localStorage.getItem('state');
  }
}
