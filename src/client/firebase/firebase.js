import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.storage = app.storage();
    this.database = app.database();
    this.auth = app.auth();
  }

  // AUTH ACTIONS 
  // --------

  createAccount = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  signIn = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  signInWithGoogle = () => this.auth.signInWithPopup(new app.auth.GoogleAuthProvider());
  
  signInWithFacebook = () => this.auth.signInWithPopup(new app.auth.FacebookAuthProvider());
  
  signOut = () => this.auth.signOut();

  passwordReset = email => this.auth.sendPasswordResetEmail(email);

  addUser = (id, user) => this.database.ref(`users/${id}`).set(user);

  getUser = id => this.database.ref(`users/${id}`).once('value');

  passwordUpdate = password => this.auth.currentUser.updatePassword(password);

  onAuthStateChanged = () => {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          return resolve(user);
        } else {
          return reject(new Error('Auth State Changed failed'));
        }
      });
    });
  }

  setAuthPersistence = () => this.auth.setPersistence(app.auth.Auth.Persistence.LOCAL);
  // PRODUCT ACTIONS
  // ---------

  getProducts = () => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        didTimeout = true;
        reject('Request timeout, please try again');
      }, 15000);  

      this.database.ref('products').once('value')
        .then((snapshot) => {
          clearTimeout(timeout);
          if (!didTimeout) {
            const products = [];

            snapshot.forEach((childSnapshot) => {
                products.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            resolve(products);
          }
        })
        .catch ((e) => {
          if (didTimeout) return;
          reject(e);
        });
    });
  }
    

  addProduct = (id, product) => this.database.ref('products').child(id).set(product);

  generateKey = () => this.database.ref('products').push().key;

  storeImage = async (id, imageFile) => {
    const snapshot = await this.storage.ref('products').child(id).put(imageFile);
    const downloadURL = await snapshot.ref.getDownloadURL();

    return downloadURL;
  }

  deleteImage = id => this.storage.ref('products').child(id).delete();

  editProduct = (id, updates) => this.database.ref(`products/${id}`).update(updates);

  removeProduct = id => this.database.ref(`products/${id}`).remove();
}

const firebase = new Firebase();

export default firebase;
