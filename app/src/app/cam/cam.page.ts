import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { format, parseISO } from 'date-fns';
import { ActionSheetController } from '@ionic/angular';
import { CamService } from './cam.service';
import { selectImage, selectFile } from '@beenotung/tslib/file'
import { dataURItoBlob, resizeImage, toImage } from '@beenotung/tslib/image'

type Photo = {
  file: File
  dataUrl: string
}
@Component({
  selector: 'app-cam',
  templateUrl: './cam.page.html',
  styleUrls: ['./cam.page.scss'],
})
export class CamPage implements OnInit {

  event: any;
  placeholderAmount = "Amount";
  placeholderCategory = "Category";
  placeholderAccount = "Account";
  thisDay = new Date().toLocaleDateString();
  showMe: boolean = false;
  format = 'yyyy-MM-dd';
  modes = ['date', 'date-time', 'month', 'month-year', 'time', 'time-date', 'year'];
  selectedMode = 'date';
  showPicker = false;
  dateValue = format(new Date(), 'yyyy-MM-dd');
  formattedString = '';
  isModalOpen = false;
  isModalOpenCam = false;
  isModalOpenAlbum = false;
  fileToUpload: File | null = null;
  photos: Photo[] = []

  searchParams = new URLSearchParams(location.search)
  newRecord = this.searchParams.get('id');



  newForm = {
    id: `${this.newRecord}`,
    date: '',
    amount: '',
    type: '',
    account: '',
    remark: '',
  } as any

  newFormData = new FormData()

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private camService: CamService
  ) {
    this.setToday();
  }
  @Output()
  public pictureTaken = new EventEmitter<WebcamImage>();

  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = true;
  public deviceId!: string;
  public videoOptions: MediaTrackConstraints = {
    width: { ideal: 300 },
    height: { ideal: 300 }
  };
  public errors: WebcamInitError[] = [];

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 5;
      });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.pictureTaken.emit(webcamImage);
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  imagePath: string = ""
  imageFile: File | null = null

  public onFileSelected(event: any) {

    const file: File = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePath = reader.result as string;
    }
    reader.readAsDataURL(file)

    this.imageFile = event.target.files

  }

  // latest snapshot
  public webcamImage: WebcamImage = Image as any;

  clickCheck() {
    this.showPicker = !this.showPicker;
  }

  setToday() {
    this.formattedString = format(new Date(), 'yyyy-MM-dd');
  }

  dateChanged(value: any) {
    this.dateValue = value;
    this.formattedString = format(parseISO(value), 'yyyy-MM-dd');
    this.showPicker = false;

  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image',
      cssClass: 'my-custom-class',
      buttons: [
        {
          icon: 'camera',
          text: 'Take Photo',
          handler: () => {
            this.isModalOpenCam = true
          }
        },
        {
          icon: 'image',
          text: 'Album',
          handler: () => {
            // this.isModalOpenAlbum = true
            selectFile({
              capture: false,
            })
          }
        },
        {
          text: 'Cancel',
          role: 'destructive',
          handler: () => {
          }
        },
      ],
    });
    actionSheet.present();
  }

  uploadAlbum() {
    this.isModalOpenAlbum = false
  }
  uploadCam() {
    this.isModalOpenCam = false
  }


  async uploadImagesToDb() {
    let result = await this.camService.uploadFormToDB(this.newForm)
    location.href = "http://localhost:4200/home";
  }

  pickFromAlbum() {
    selectImage({ multiple: true, capture: false })
      .then(files => this.loadImages(files))
  }

  pickFromCam() {
    selectImage({ multiple: true, capture: true })
      .then(files => this.loadImages(files))

  }

  async loadImages(files: File[]) {
    for (let file of files) {

      let image = await toImage(file)
      let dataUrl = resizeImage(image, 500, 500, 'image/jpeg', 0.9)
      let blob = dataURItoBlob(dataUrl)

    }
  }

  removePhoto(i: number) {
    this.photos.splice(i, 1)
  }


  date2() {
    return JSON.stringify(this.newForm, null, 2)
  }

  goHome() {
    location.href = "http://localhost:4200/home";
  }
  goAdd() {
    location.href = "http://localhost:4200/ai-ai";
  }
  goLogin() {
    location.href = "http://localhost:4200/login";
  }

}