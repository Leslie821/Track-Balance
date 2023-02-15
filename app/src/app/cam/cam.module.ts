import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CamPageRoutingModule } from './cam-routing.module';
import { CamPage } from './cam.page';
import { WebcamModule } from 'ngx-webcam';
import { CameraPageModule } from "../camera/camera.module";

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [CamPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CamPageRoutingModule,
    WebcamModule,
    CameraPageModule,
  ],

})
export class CamPageModule { }
