import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AiAiService {

  constructor(
    private api: ApiService,
  ) { }


  async uploadPhoto(newFormData: FormData) {
    let photoUpload = await this.api.upload('/newForm/upload', newFormData)
    console.log("photoUpload:", photoUpload);
    console.log("newFormData:", newFormData);
    return photoUpload
  }

}
