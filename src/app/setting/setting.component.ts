import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from './../app.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  settingForm = new FormGroup({
    key: new FormControl(''),
    numberResult: new FormControl(''),
  });

  constructor(private appService: AppService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.settingForm.value);
    if (this.settingForm.get('key')?.value != '') {
      this.appService.setKeyToLocal(this.settingForm.get('key')?.value);
      this.appService.openSnackbar('Settings changed successfully');
    }

    if (this.settingForm.get('numberResult')?.value != '') {
      this.appService.setNumberOfResultToLocal(
        this.settingForm.get('numberResult')?.value
      );
      this.appService.openSnackbar('Settings changed successfully');
    }
    this.settingForm.reset();
  }

  onReset() {
    localStorage.removeItem('key');
    localStorage.removeItem('number');
    this.settingForm.reset();
    this.appService.openSnackbar('Settings reset successfully');
  }
}
