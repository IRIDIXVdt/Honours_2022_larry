import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private db: AngularFirestore) { }

  addDataService(collection, data) {
    return this.db.collection(collection).add(data);
  }

  updateDataById(collection, docId, data) {
    return this.db.doc(collection + '/' + docId).update(data);
  }

  getCollection(collection) {
    return this.db.collection(collection).get();
  }

  getDocument(collection, docId) {
    return this.db.doc(collection + '/' + docId).get();
  }

  getCollectionWithFilter(collection, filter) {
    return this.db.collection(collection, filter).get();
  }

  getSessionWithFilter(collection, code, order) {
    return this.db.collection(collection, ref =>
      ref.where('sCode', '==', code).orderBy(order))
      .get();
  }

  getCollectionFilter(collection, type, targetValue) {
    return this.db.collection(collection, ref =>
      ref.where(type, '==', targetValue)).get();
  }

  getUser(userId) {
    return this.db.doc(`users/${userId}`) as AngularFirestoreDocument<any>;
  }

}
