import { UsageComponent } from './usage/usage.component';
import { SettingComponent } from './setting/setting.component';
import { VideoComponent } from './video/video.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'video', component: VideoComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'usage', component: UsageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
