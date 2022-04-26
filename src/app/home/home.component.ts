import { IVideo } from './../shared/models/video';
import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  searchResults: IVideo[] = [];

  playlist: IVideo[] = [];

  currentVideo?: IVideo;

  enableSearch = false;

  constructor(private appService: AppService, private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.getVideos('');
    this.addStorageListener();
    this.playlist = this.appService.getPlaylistFromLocal();
    this.currentVideo = this.appService.getCurrentVideoFromLocal();
  }

  ngOnDestroy() {
    this.removeStorageListener();
  }

  onSubmit() {
    let searchfield = this.searchForm.get('search')?.value;
    this.getVideos(searchfield);
  }

  onPlay(video:IVideo){
    this.currentVideo = video;
    this.appService.setCurrentVideoToLocal(video);
  }

  onAddToPlaylist(video: IVideo) {
    if(this.playlist === null){
      this.playlist = [];
    }
    if (this.playlist.findIndex((v) => v.id.videoId === video.id.videoId) > -1) {
      this.snackbar.open('This video is in the playlist', 'Dismiss');
    } else {
      this.playlist.push(video);
      this.appService.setPlaylistToLocal(this.playlist);
    }
  }

  onSearchChange(event: any) {
    this.enableSearch = false;
    setTimeout(() => {
      this.enableSearch = true;
      if (this.enableSearch) {
        this.getVideos(event.target.value);
      }
    }, 1000);
  }

  onRemoveFromPlaylist(index: number) {
    this.appService.removeVideoFromPlaylist(index);
    this.playlist = this.appService.getPlaylistFromLocal();
  }

  addStorageListener() {
    if (window.addEventListener) {
      window.addEventListener(
        'storage',
        () => {
          this.playlist = this.appService.getPlaylistFromLocal();
          this.currentVideo = this.appService.getCurrentVideoFromLocal();
        },
        false
      );
    }
  }

  removeStorageListener() {
    window.removeEventListener(
      'storage',
      () => {
        this.playlist = this.appService.getPlaylistFromLocal();
        this.currentVideo = this.appService.getCurrentVideoFromLocal();
      },
      false
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.playlist, event.previousIndex, event.currentIndex);
    this.appService.setPlaylistToLocal(this.playlist);
  }

  getVideos(value: any) {
    this.appService.getVideos(value).subscribe((videos: IVideo[]) => {
      this.searchResults = videos;
    });
  }

}
