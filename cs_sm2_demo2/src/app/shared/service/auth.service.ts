import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";

import firebase from 'firebase/compat/app';

import { User } from "../data/userSchema";
import { AlertService } from './alert.service';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data
  admin: boolean;
  verifyAddress: string = 'tabs/account/verify';//routing address for verify email address
  homeAddress: string = 'tabs/account';
  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public als: AlertService,
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public das: DatabaseService,
  ) {
    console.log(localStorage);
  }

  isLogin() { //return true if has logged in
    // console.log(JSON.parse(localStorage.getItem('user')));
    return JSON.parse(localStorage.getItem('user')) != null;
  }

  isAdmin() {//return true if is admin
    if (JSON.parse(localStorage.getItem('admin')))
      return true;
    else
      return false;
  }

  getUserEmail() {
    if (this.isLogin()) {
      // console.log('can get email');
      return JSON.parse(localStorage.getItem('user')).email;
    }
  }

  resetLS() {//turn local storage into default
    localStorage.setItem('admin', JSON.stringify(false));
    localStorage.setItem('user', null);
  }

  updateLS(item){
    if(item=="admin"){//update admin
      this.getIsAdmin().then(v=>{
        localStorage.setItem('admin', JSON.stringify(v));
      })
    }
  }

  getIsAdmin() {//intended to be used after login, this determines if it is admin
    return new Promise((resolve, reject) => {
      if (this.isLogin())
        this.das.getAdminWithEmail(JSON.parse(localStorage.getItem('user')).email)
          .then(v => {//receive length of the corresponding querysnapshot doc
            if (v > 0) {
              console.log("User found admin", v);
              resolve(true);
            } else {
              console.log("User not admin", v);
              resolve(false);
            }
          });
      else {
        localStorage.setItem('admin', JSON.stringify(false));
        console.log("Have not logged in ");
        resolve(true);
      }
    });
  }

  async signOut() {  // Sign out 
    await this.als.presentChoice("Do you want to sign out?").then(async (resultLoading) => {
      if (resultLoading != null) {
        return this.afAuth.signOut().then(() => {
          this.userData = null;
          this.resetLS();
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
          this.userData = result.user; // stored user's info in to local variable (refresh page will reset this variable)
          localStorage.setItem('user', JSON.stringify(this.userData)); // stored user's info in to local database (refresh page will not reset) 
          this.updateLS('admin');
          this.setUserData(result.user);  // update user's info to remote database
          loading.dismiss(); //stop the loading animation
          this.router.navigate([this.homeAddress]);
        } else {
          loading.dismiss(); //stop the loading animation
          this.als.signInErrorAlert('Email is not verified');
        }
      }).catch((error) => {
        loading.dismiss();
        this.userData = null;
        console.log("Login error: ", error);
        if (error.toString().includes('wrong-password') || error.toString().includes('user-not-found'))
          this.als.signInErrorAlert('The email or password is invalid');
        else
          this.als.signInErrorAlert('Check your internet connection');
      })
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
      this.resetLS();
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
          this.userData = result.user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          this.router.navigate([this.homeAddress]);//new routing 
          this.updateLS("admin");
        })
        this.setUserData(result.user);
      }).catch((error) => {
        this.als.signInErrorAlert('Failed login with google');
      })
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      email: user.email,
      emailVerified: user.emailVerified,
      sessionList: [],
    }
    return userRef.set(userData, {
      merge: true
      //we want to update only specific attributes
      //but we don't want the software to crash if such object doesn't exist in the first place
    })
  }

  

  async updateUserName(displayName) {
    const loading = await this.als.startLoading();

    const profile = {
      displayName: displayName,
    };
    (await this.afAuth.currentUser).updateProfile(profile).then(() => {
      console.log('updated userName');
      this.updateUserData();
      loading.dismiss();
    }).catch((error) => {
      console.log(error);
      loading.dismiss();
      this.als.displayMessage("Check your internet Connection");
    });
  }

  updateUserData() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        if (user.emailVerified) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          this.userData = null;
          localStorage.setItem('user', null);
        }
      } else {
        this.userData = null;
        localStorage.setItem('user', null);
      }
    })
  }

  getTime() {
    const myTimestamp = firebase.firestore.FieldValue.serverTimestamp();
    console.log(myTimestamp);
  }
}
