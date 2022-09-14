import { Injectable } from '@nestjs/common';

import {
  initializeApp as initializeAppAdmin,
  cert,
  ServiceAccount,
  App,
  getApps,
} from 'firebase-admin/app';
import { initializeApp } from 'firebase/app';

import { Auth, getAuth as getAuthAdmin } from 'firebase-admin/auth';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import {
  doc,
  setDoc,
  getFirestore,
  Firestore,
  updateDoc,
  addDoc,
  collection,
  getDoc,
} from 'firebase/firestore';

@Injectable()
export class FirebaseRepository {
  private firebaseApp: App;
  private firebaseAuth: Auth;
  private firebaseFirestore: Firestore;

  constructor() {
    if (getApps().length === 0) {
      this.firebaseApp = initializeAppAdmin({
        credential: cert(
          JSON.parse(process.env.FIREBASE_ADMIN) as ServiceAccount,
        ),
        //databaseURL: 'https://tutorial-auth-d9a34.firebaseio.com',
      });
    }

    initializeApp({
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    });

    this.firebaseAuth = getAuthAdmin(this.firebaseApp);
    this.firebaseFirestore = getFirestore();
  }

  Authenticate = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password,
      );

      return {
        uid: user.uid,
        email: user.email,
        token: await user.getIdToken(),
      };
    } catch (err) {
      return err;
    }
  };

  getAuth(): Auth {
    return this.firebaseAuth;
  }

  registerUser = async (
    email: string,
    password: string,
    role: number,
    phoneNumber: string,
    displayName: string,
  ) => {
    try {
      const user = await this.getAuth().createUser({
        email,
        emailVerified: false,
        phoneNumber,
        password,
        displayName,
      });

      await this.getAuth().setCustomUserClaims(user.uid, { role });

      return {
        uid: user.uid,
        email: user.email,
      };
    } catch (err) {
      return err.message;
    }
  };

  getDocumentRef = async (collectionName: string, id: string) => {
    try {
      const docRef = doc(this.firebaseFirestore, collectionName, id);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docRef;
      }
      console.log('Document does not exist');
    } catch (err) {
      console.log(err);

      return err.message;
    }
  };

  getById = async (collectionName: string, id: string) => {
    try {
      const docRef = doc(this.firebaseFirestore, collectionName, id);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
      console.log('Document does not exist');
    } catch (err) {
      console.log(err);

      return err.message;
    }
  };

  getUser = () => {
    const user = getAuth().currentUser;

    if (!user) throw new Error("User doesn't exist");

    return user;
  };

  listUser = () => this.getAuth().listUsers();

  async create(collectionName: string, data: any, id?: string, ref?: any) {
    try {
      console.log('create ====> ', { collectionName, data, id, ref });

      if (id) {
        await setDoc(
          doc(ref || this.firebaseFirestore, collectionName, id),
          {
            ...data,
            created_at: new Date(Date.now()),
            updated_at: new Date(Date.now()),
          },
          {
            merge: true,
          },
        );

        console.log('Document created with ID: ', id);
        return;
      }

      const docRef = await addDoc(
        collection(ref || this.firebaseFirestore, collectionName),
        {
          ...data,
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
        },
      );
      console.log('Document created with ID: ', docRef.id);
    } catch (err) {
      return err.message;
    }
  }

  async update(collection: string, data: any, id: string) {
    try {
      const dbRef = doc(this.firebaseFirestore, collection, id);

      await updateDoc(dbRef, {
        ...data,
        updated_at: new Date(Date.now()),
      });

      console.log('Document updated with ID: ', id);
    } catch (err) {
      return err.message;
    }
  }
}
