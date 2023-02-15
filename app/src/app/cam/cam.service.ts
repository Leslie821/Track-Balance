import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class CamService {

  host = 'http://localhost:3000'
  constructor(private api: ApiService) { }

  createUser() {
    return fetch(`${this.host}/upload`, {
    })
  }

  async uploadFormToDB(formData: FormData) {
    let res = await this.api.post('/newForm/inputToDb', formData);
    return res
  }

}