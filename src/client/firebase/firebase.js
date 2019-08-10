import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: '',
  messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.database = app.database();
    this.auth = app.auth();
  }

  createAccount = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signIn = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut = () => this.auth.signOut();

  passwordReset = email => this.auth.sendPasswordResetEmail(email);

  // doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}

const firebase = new Firebase();

export default firebase;
