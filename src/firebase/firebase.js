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

  changePassword = (currentPassword, newPassword) => {
    return new Promise((resolve, reject) => {
      this.reauthenticate(currentPassword).then(() => {
        const user = this.auth.currentUser;
        user.updatePassword(newPassword).then(() => {
          resolve('Password updated successfully!');
        }).catch(error =>  reject(error));
      }).catch(error =>  reject(error));
    });
  }

  reauthenticate = (currentPassword) => {
    const user = this.auth.currentUser;
    const cred = app.auth.EmailAuthProvider.credential(user.email, currentPassword);

    return user.reauthenticateWithCredential(cred);
  }

  updateEmail = (currentPassword, newEmail) => {
    return new Promise((resolve, reject) => {
      this.reauthenticate(currentPassword).then(() => {
        const user = this.auth.currentUser;
        user.updateEmail(newEmail).then((data) => {
          resolve('Email Successfully updated');
        }).catch(error => reject(error));
      }).catch(error => reject(error));
    });
  }

  updateProfile = (id, updates) => this.database.ref(`users/${id}`).update(updates);

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

  getProducts = (lastRefKey) => {
      let didTimeout = false;

      return new Promise(async (resolve, reject) => {
        if (lastRefKey) {
          try {
            const snapshot = await this.database.ref('products').orderByKey().endAt(lastRefKey).limitToLast(13).once('value');
            const arrayOfKeys = Object.keys(snapshot.val()).sort().reverse().slice(1);
            const products = arrayOfKeys.map(key => ({ id: key, ...snapshot.val()[key] }));
            const lastKey = arrayOfKeys[arrayOfKeys.length - 1];
            
            resolve({ products, lastKey });
            
            // const products = [];
            // snapshot.forEach((childSnapshot) => {
            //     products.push({
            //         id: childSnapshot.key,
            //         ...childSnapshot.val()
            //     });
            // });
            // resolve(products.sort((a, b) => a.id > b.id ? 1 : -1).reverse().slice(1));
          } catch (e) {
            reject(':( Failed to fetch products.');
          }
        } else {
          const timeout = setTimeout(() => {
            didTimeout = true;
            reject('Request timeout, please try again');
          }, 15000); 

          try {
            // getting the total count of data
            // adding shallow parameter for smaller response size
            // better than making a query from firebase
            const request = await fetch(`${process.env.FIREBASE_DB_URL}/products.json?shallow=true`);
            const total = await request.json();
            const snapshot = await this.database.ref('products').orderByKey().limitToLast(12).once('value');
            
            clearTimeout(timeout);
            if (!didTimeout) {
              const arrayOfKeys = Object.keys(snapshot.val()).sort().reverse();
              const products = arrayOfKeys.map(key => ({ id: key, ...snapshot.val()[key] }));
              const lastKey = arrayOfKeys[arrayOfKeys.length - 1];
              
              resolve({ products, lastKey, total: Object.keys(total).length });
            }
          } catch (e) {
            if (didTimeout) return;
            console.log('Failed to fetch products: An error occured while trying to fetch products or there may be no product ', e);
            reject(':( Failed to fetch products.');
          }
        }
      });
  }
    

  addProduct = (id, product) => this.database.ref('products').child(id).set(product);

  generateKey = () => this.database.ref('products').push().key;

  storeImage = async (id, folder, imageFile) => {
    const snapshot = await this.storage.ref(folder).child(id).put(imageFile);
    const downloadURL = await snapshot.ref.getDownloadURL();

    return downloadURL;
  }

  deleteImage = id => this.storage.ref('products').child(id).delete();

  editProduct = (id, updates) => this.database.ref(`products/${id}`).update(updates);

  removeProduct = id => this.database.ref(`products/${id}`).remove();
}

const firebase = new Firebase();

export default firebase;
