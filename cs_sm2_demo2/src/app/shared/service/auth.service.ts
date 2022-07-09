import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";

import firebase from 'firebase/compat/app';

import { User } from "../data/userSchema";
import { AlertService } from './alert.service';
import { DatabaseService } from './database.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  verifyAddress: string = 'tabs/account/verify';//routing address for verify email address
  homeAddress: string = 'tabs/account';
  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public als: AlertService,
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public das: DatabaseService,
    public los: LocalStorageService,
  ) { }

  //to do: 
  //read from database, store in local storage
  //change on website, update both database and storage

  async signOut() {  // Sign out 
    await this.als.presentChoice("Do you want to sign out?").then(async (resultLoading) => {
      if (resultLoading != null) {
        return this.afAuth.signOut().then(() => {
          this.los.resetLS();
          resultLoading.dismiss();
          this.router.navigate([this.homeAddress]);
        }).catch((error) => {
          console.log(error);
          this.als.displayMessage("Check your internet Connection");
        })
      }
    });
  }

  // Sign in with email/password
  async signIn(email, password) {
    // create a loading animation
    const loading = await this.als.startLoading();
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user.emailVerified) { // if user's account has been verified
          console.log("User is verified, update all the information in local storage");
          //setLocalUserData updateLS console log correct information
          loading.dismiss(); //stop the loading animation
          this.userDataUpdate(result.user);
        } else {
          loading.dismiss(); //stop the loading animation
          this.als.signInErrorAlert('Email is not verified');
        }
      }).catch((error) => {
        loading.dismiss();
        console.log("Login error: ", error);
        if (error.toString().includes('wrong-password') || error.toString().includes('user-not-found'))
          this.als.signInErrorAlert('The email or password is invalid');
        else
          this.als.signInErrorAlert('Check your internet connection');
      })
  }

  async userDataUpdate(data) {
    const loading = await this.als.startLoading();
    try {
      // stored user's info in to local database (refresh page will not reset) 
      this.los.setLocalData('user', data); //store user List
      this.los.setLocalData('sessionList', await this.das.getUserCustomizeInfo('sessionList'));
      //to do: add user progress to local storage
      this.los.checkAdminStatus('admin');//check if is admin
      // update user's info to remote database
      this.das.setUserData(data);
      //store user session data
      await this.storeSesssion();
      console.log(localStorage);
      this.router.navigate([this.homeAddress]);
    } catch (error) {
      console.error(error);
    } finally {
      loading.dismiss();
    }
  }

  async storeSesssion(){
    //fetch all the sessions
    const sList: any = await this.das.getSessionData('All');
    //store it in local storage
    this.los.setLocalData('allList', sList);
    console.log(sList);
    const sessionIdList: string[] = this.das.getLocalUserSessionList();
    if (sessionIdList != null && sessionIdList.length > 0) {
      var sessionList = [];
      for (let i = 0; i < sList.length; i++) {//iterate through all the list
        if (sessionIdList.filter(e => e == sList[i].id).length > 0) {
          sessionList.push(sList[i]);
        }
      }
      this.los.setLocalData('userList', sessionList);
    }
  }

  // Sign up with email/password
  async signUp(email, password) {
    // create a loading animation
    const loading = await this.als.startLoading();
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        //insert question set information
        loading.dismiss(); // when get result from firebase, stop the loading animation
        this.sendVerificationMail();
      }).catch((error) => {
        loading.dismiss();
        console.log(error);
        if (error.toString().includes("email-already-in-use"))
          this.als.signInErrorAlert('The email address is already in use by another account, try another one');
        else
          this.als.signInErrorAlert('Check your internet connection');
      })
  }

  // Send email verfificaiton when new user sign up
  async sendVerificationMail() {
    const loading = await this.als.startLoading();
    return (await (this.afAuth.currentUser)).sendEmailVerification()
      .then(() => {
        loading.dismiss();
        console.log("send email")
        this.router.navigate([this.verifyAddress]);
      })
  }

  async resendVerificationMail() {
    const loading = await this.als.startLoading();
    (await (this.afAuth.currentUser)).sendEmailVerification()
      .then(() => {
        loading.dismiss();
        this.als.displayMessage('A new verify email has been send to your email address');
        console.log("re-send email");

      }).catch((error) => {
        loading.dismiss();
        this.als.displayMessage('The request is too frequent. Please try again later');
      })
  }

  // Reset Forggot password
  async forgotPassword(passwordResetEmail) {
    const loading = await this.als.startLoading();
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.signOutAndResetPassword();
        loading.dismiss();
        this.als.displayMessage("A reset password email has been send to you");
      }).catch((error) => {
        this.signOutAndResetPassword();
        loading.dismiss();
        console.log(error)
        if (error == 'FirebaseError: Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).') {
          this.als.displayMessage("The email address has not been registered");
        }
        else {
          this.als.displayMessage("Check your internet Connection");
        }

      })
  }

  signOutAndResetPassword() {
    return this.afAuth.signOut().then(() => {
      this.los.resetLS();
    }).catch((error) => {
      console.log(error);
      this.als.displayMessage("Check your internet Connection");
    })
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          //to do: bug fix authlogin
          // this.los.setLocalUserData(result.user);
          // this.router.navigate([this.homeAddress]);//new routing 
          // this.los.checkAdminStatus("admin");
          this.userDataUpdate(result.user);
        })
        this.das.setUserData(result.user);
      }).catch((error) => {
        this.als.signInErrorAlert('Failed login with google');
      })
  }

  updateUserData() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        if (user.emailVerified) {
          this.los.setLocalUserData(user);
        } else {
          this.los.setLocalUserData(null);
        }
      } else {
        this.los.setLocalUserData(null);
      }
    })
  }

  getTime() {
    const myTimestamp = firebase.firestore.FieldValue.serverTimestamp();
    console.log(myTimestamp);
  }

  isLogin() { //return true if has logged in
    return JSON.parse(localStorage.getItem('user')) != null;
  }

  isAdmin() {//return true if is admin
    if (JSON.parse(localStorage.getItem('admin')))
      return true;
    else
      return false;
  }

  getUserEmail() {
    if (this.isLogin())
      return JSON.parse(localStorage.getItem('user')).email;
  }
}
