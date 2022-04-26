import { IVideo } from './../shared/models/video';
import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';

let apiLoaded = false;

@Component({
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  constructor(private appService: AppService) {}

  playlist: IVideo[] = [];

  currentVideo?: IVideo;

  videoPlayingPosition?: number;

  ngOnInit(): void {
    this.loadIframe();
    this.loadVideo();
  }

  ngOnDestroy() {
    this.removeStorageListener();
  }

  removeStorageListener() {
    window.removeEventListener('storage', () => {}, false);
  }

  onStateChange(event: any) {
    if (event.data === 0) {
      this.playlist = this.appService.getPlaylistFromLocal();
      this.videoPlayingPosition = this.playlist.findIndex(
        (video) => video.id.videoId == this.currentVideo!.id.videoId
      );

      if (this.playlist[this.videoPlayingPosition + 1]) {
        this.currentVideo = this.playlist[this.videoPlayingPosition + 1];
        this.appService.setCurrentVideoToLocal(this.currentVideo);
      } else {
        this.currentVideo = this.playlist[0];
        this.appService.setCurrentVideoToLocal(this.currentVideo);
      }
      this.playVideo(event);
    }
  }

  onReady(event: any) {
    this.addStorageListener(event);
    this.playVideo(event);
  }

  addStorageListener(event$: any) {
    if (window.addEventListener) {
      window.addEventListener(
        'storage',
        () => {
          if (
            this.currentVideo?.id.videoId !==
            this.appService.getCurrentVideoFromLocal().id.videoId
          ) {
            this.currentVideo = this.appService.getCurrentVideoFromLocal();
            this.playVideo(event$);
          }
        },
        false
      );
    }
  }

  loadVideo() {
    this.playlist = this.appService.getPlaylistFromLocal();

    if (this.appService.getCurrentVideoFromLocal()) {
      this.currentVideo = this.appService.getCurrentVideoFromLocal();
    } else if (this.playlist.length > 0) {
      this.currentVideo = this.playlist[0];
      this.appService.setCurrentVideoToLocal(this.currentVideo);
    }
  }

  loadIframe() {
    if (!apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      apiLoaded = true;
    }
  }

  playVideo(event: any) {
    setTimeout(() => {
      event.target.playVideo();
    }, 1500);
  }
}
