import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  isLogin() { //return true if has logged in
    // console.log(JSON.parse(localStorage.getItem('user')));
    return JSON.parse(localStorage.getItem('user')) != null;
  }
  
}
