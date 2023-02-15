import { Component, OnInit } from '@angular/core';
import { selectImage } from '@beenotung/tslib/file';
import { dataURItoBlob, resizeImage, toImage } from '@beenotung/tslib/image';
import { AiAiService } from './ai-ai.service'


type Photo = {
  file: File
  dataUrl: string
}
@Component({
  selector: 'app-ai-ai',
  templateUrl: './ai-ai.page.html',
  styleUrls: ['./ai-ai.page.scss'],
})
export class AiAiPage implements OnInit {

  imagePath: string = ""
  imageFile: File | null = null
  photos: Photo[] = []

  constructor(
    private AiAiService: AiAiService,
  ) { }

  ngOnInit() {
  }

  public onFileSelected(event: any) {

    const file: File = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePath = reader.result as string;
    }
    reader.readAsDataURL(file)

    this.imageFile = event.target.files

  }

  pickFromAlbum() {
    selectImage({ multiple: true, capture: false })
      .then(files => this.loadImages(files))

  }

  pickFromCam() {
    selectImage({ multiple: true, capture: true })
      .then(files => this.loadImages(files))

  }

  removePhoto(i: number) {
    this.photos.splice(i, 1)
  }

  async loadImages(files: File[]) {
    for (let file of files) {

      let image = await toImage(file)
      let dataUrl = resizeImage(image, 500, 500, 'image/jpeg')
      let blob = dataURItoBlob(dataUrl)

      file = new File([blob], file.name, {
        type: blob.type,
        lastModified: file.lastModified
      })
      this.photos.push({ file, dataUrl })
    }
  }

  async uploadImagesToDb() {
    let formData = new FormData()

    for (let photo of this.photos) {
      formData.append('file', photo.file)
    }

    let result = await this.AiAiService.uploadPhoto(formData)

    let dataUrl = result.result[0].id
    console.log('dataUrl:', dataUrl);

    location.href = `http://localhost:4200/cam?id=${dataUrl}`;

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
