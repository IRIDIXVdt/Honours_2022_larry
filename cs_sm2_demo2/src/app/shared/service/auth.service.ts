import { Injectable, NgZone } from '@angular/core';
import { User } from "../data/userSchema";
import firebase from 'firebase/compat/app';

import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";
import { AlertController, LoadingController } from '@ionic/angular';

import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data
  admin: boolean;

  verifyAddress: string = 'tabs/account/verify';
  homeAddress: string = 'tabs/account';

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public als: AlertService,
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
  ) { }

  isLogin() { //return true if has logged in
    /* console.log("login check ",localStorage.getItem('user')) */
    return JSON.parse(localStorage.getItem('user'));
  }

  isAdmin() {//return true if is admin
    return JSON.parse(localStorage.getItem('admin'));
  }

  getUserEmail() {
    if (this.isLogin) {
      return JSON.parse(localStorage.getItem('user')).email;
    }
  }

  async SignOut() {  // Sign out 
    await this.als.presentChoice("test message").then(async (resultLoading) => {
      if (resultLoading != null) {
        return this.afAuth.signOut().then(() => {
          this.userData = null;
          localStorage.setItem('admin', JSON.stringify(false));
          localStorage.setItem('user', null);
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
  async SignIn(email, password) {
    // create a loading animation
    const loading = await this.als.startLoading();
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user.emailVerified) { // if user's account has been verified
          this.userData = result.user; // stored user's info in to local variable (refresh page will reset this variable)
          localStorage.setItem('user', JSON.stringify(this.userData)); // stored user's info in to local database (refresh page will not reset) 
          this.getIsAdmin();  // check the user is admin or not
          this.SetUserData(result.user);  // update user's info to remote database
          loading.dismiss(); //stop the loading animation
          this.router.navigate([this.homeAddress]);
        } else {
          loading.dismiss(); //stop the loading animation
          this.als.signInErrorAlert("Email is not verified");
        }
      }).catch((error) => {
        loading.dismiss();
        this.userData = null;
        console.log("Login error: ", error);
        if (error == 'FirebaseError: Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).'
          || error == 'FirebaseError: Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).') {
          this.als.signInErrorAlert('The email or password is invalid');
        } else {
          this.als.signInErrorAlert('Check your internet connection');
        }
      })
  }



  // Sign up with email/password
  async SignUp(email, password) {
    // create a loading animation
    const loading = await this.als.startLoading();
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // let articles: any[];
        // let articlesCollection = this.afs.collection('articles').snapshotChanges();
        // const subscription = articlesCollection.subscribe(res => {
        //   articles = res.map(e => {
        //     return {
        //       docId: e.payload.doc.id,
        //       segment: e.payload.doc.data()['segment']
        //     }
        //   })
        //   let readArticles = this.initializeUserReadArticles(articles)
        //   this.afs.collection("usersCollection").doc(result.user.uid)
        //     .set({
        //       readArticles: readArticles
        //     })
        // });
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        loading.dismiss(); // when get result from firebase, stop the loading animation
        this.SendVerificationMail();
      }).catch((error) => {
        loading.dismiss();
        console.log(error);
        if (error == 'FirebaseError: Firebase: The email address is already in use by another account. (auth/email-already-in-use).') {
          this.als.signInErrorAlert('The email address is already in use by another account, try another one');
        }
        else {
          this.als.signInErrorAlert('Check your internet connection');
        }

      })
  }

  // Send email verfificaiton when new user sign up
  async SendVerificationMail() {
    const loading = await this.als.startLoading();
    return (await (this.afAuth.currentUser)).sendEmailVerification()
      .then(() => {
        loading.dismiss();
        console.log("send email")
        this.router.navigate([this.verifyAddress]);
      })
  }

  async reSendVerificationMail() {
    const loading = await this.als.startLoading();
    (await (this.afAuth.currentUser)).sendEmailVerification()
      .then(() => {
        loading.dismiss();
        this.als.verifyMessage('A new verify email has been send to your email address');
        console.log("re-send email");

      }).catch((error) => {
        loading.dismiss();
        this.als.verifyMessage('The request is too frequent. Please try again later');
      })
  }

  // Reset Forggot password
  async ForgotPassword(passwordResetEmail) {
    const loading = await this.als.startLoading();
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.SignOutRestPassword();
        loading.dismiss();
        this.als.displayMessage("A reset password email has been send to you");
      }).catch((error) => {
        this.SignOutRestPassword();
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

  SignOutRestPassword() {
    return this.afAuth.signOut().then(() => {
      localStorage.setItem('admin', JSON.stringify(false));
      localStorage.setItem('user', null);
    }).catch((error) => {
      console.log(error);
      this.als.displayMessage("Check your internet Connection");
    })
  }


  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  consoleLog() {
    console.log('one');
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.userData = result.user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          this.router.navigate([this.homeAddress]);//new routing 
          this.getIsAdmin();
        })
        this.SetUserData(result.user);
      }).catch((error) => {
        this.als.signInErrorAlert('Failed login with google');
      })
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
      //we want to update only specific attributes
      //but we don't want the software to crash if such object doesn't exist in the first place
    })
  }

  getIsAdmin() {//intended to be used after login, this determines if it is admin
    if (this.isLogin()) {
      const adminAccess = this.afs.collection("adminUsers", ref => ref.where('email', '==', JSON.parse(localStorage.getItem('user')).email)).snapshotChanges();
      const subscription = adminAccess.subscribe(res => {
        if (res.length > 0) {
          console.log(" Match found.");
          localStorage.setItem('admin', JSON.stringify(true));
          subscription.unsubscribe();
          return true;
        } else {
          console.log("Does not exist.");
          localStorage.setItem('admin', JSON.stringify(false));
          subscription.unsubscribe();
          return false;
        }
      });
    }
    else {
      localStorage.setItem('admin', JSON.stringify(false));
      console.log("Have not logged in ");
      return false;
    }
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
