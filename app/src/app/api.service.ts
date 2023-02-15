import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api_origin = 'http://localhost:3000'

  constructor(
    private toastController: ToastController
  ) { }

  async fetch(url: string, init: RequestInit) {
    let p = fetch(this.api_origin + url, init)
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          throw new Error(json.error)
        }
        return json
      })
    p
      .catch(async error => {
        let toast: HTMLIonToastElement = await this.toastController.create({
          color: 'danger',
          message: String(error),
          duration: 3500,
          buttons: [{
            text: 'Dismiss',
            role: 'cancel',
            handler() {
              toast.dismiss()
            }
          }]
        })
        await toast.present()
      })
    return await p
  }

  async post(url: string, body: object) {
    return await this.fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
  }


  async upload(url: string, body: FormData) {
    return await this.fetch(url, {
      method: 'POST',
      body: body
    })
  }

  async get(url: string, query?: object) {
    if (query) {
      let params = new URLSearchParams(Object.entries(query))
      url = url + '?' + params
    }
    return await this.fetch(url, { method: 'GET' })
  }
}
