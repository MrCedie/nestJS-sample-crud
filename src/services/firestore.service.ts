import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { firebaseConfig } from '../core/config/firebase-config';
@Injectable()
export class FireStoreService {
  private firestore: FirebaseFirestore.Firestore;

  constructor() {
    this.initializeFirestore();
  }

  private initializeFirestore() {
    const serviceAccount = require('../../sample-crud-d241f-firebase-adminsdk-z7r04-5c66ab7e8d.json'); // Path to your service account key file
    const config = {
      credential: admin.credential.cert(serviceAccount),
      ...firebaseConfig, // Replace with your Firestore database URL
    };

    if (!admin.apps.length) {
      admin.initializeApp(config);
    }

    this.firestore = admin.firestore();
  }

  async addUser(body: any): Promise<void> {
    await this.firestore.collection('users').add(body);
  }

  async getUsers(): Promise<any[]> {
    const querySnapshot = await this.firestore.collection('users').get();
    const documents = querySnapshot.docs.map((doc) => {
      const userId = doc.id;
      return {
        id: userId,
        ...doc.data(),
      };
    });
    return documents;
  }

  async updateUser(id: string, body: any) {
    await this.firestore.collection('users').doc(id).update(body);
  }

  async deleteUser(id: string) {
    await this.firestore.collection('users').doc(id).delete();
  }

  async getUser(id: string): Promise<any> {
    const querySnapshot = await this.firestore
      .collection('users')
      .doc(id)
      .get();
    if (querySnapshot.exists) {
      const document = querySnapshot.data();
      return {
        id: querySnapshot.id,
        ...document,
      };
    }

    return null;
  }
}
