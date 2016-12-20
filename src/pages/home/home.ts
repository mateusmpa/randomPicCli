import { Component } from '@angular/core';
import { Camera } from 'ionic-native';

import { HomeService } from '../../providers/home-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HomeService]
})
export class HomePage {
  public photos: any;

  constructor(public homeService: HomeService) {
    this.loadHome();
  }

  loadHome(){
    console.log('hey');
    this.homeService.load()
    .then(data => {
      console.log(data);
      this.photos = data;
    });
  }

  addPhotoHome(photo){
    console.log('hey 2');
    this.homeService.addPhoto(photo)
    .then(data => {
      this.loadHome();
    });
  }

  doRefresh(refresher){
    setTimeout(() => {
      this.loadHome();
      refresher.complete();
    }, 2000);
  }

  takePicture(){
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      this.addPhotoHome("data:image/jpeg;base64," + imageData);
    }, (err) => {
      console.log(err);
    });
  }

}
