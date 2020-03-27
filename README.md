# Salinaka | E-commerce react app
Simple ecommerce react js app with firebase.

### [Live demo](https://salinaka-ecommerce.firebaseapp.com)

![Salinaka screenshot](https://raw.githubusercontent.com/jgudo/ecommerce-react/master/static/screeny1.png)
![Salinaka screenshot](https://raw.githubusercontent.com/jgudo/ecommerce-react/master/static/screeny2.png)
![Salinaka screenshot](https://raw.githubusercontent.com/jgudo/ecommerce-react/master/static/screeny3.png)

### Install Dependencies
```sh
$ npm install 
```
### Create a new firebase project
Login into your google account and create a new firebase project [here](https://console.firebase.google.com/u/0/)

Create a `.env.prod` file for production and `.env.dev`for development in the root of your project folder
and add the following configuration details. It can be found on your firebase project.

```
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_DB_URL=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MSG_SENDER_ID=
FIREBASE_APP_ID=

```

After setting up necessary configuration,
create a *Database* and choose *Real Time Database* and start in test mode

### Run development server
```sh 
$ npm run dev-server
```

### Build the project
```sh
$ npm run build
```

### How to add products or perform CRUD operations for Admin
1. Inside `src/routers/AppRouter.js` uncomment all code related to admin.
2. Inside `src/reducers/authReducer.js`, uncomment initState and change the initState type value from 'client' to 'admin'. Delete `initState` variable if you want to authenticate client.
3. Inside `src/sagas/authSaga.js`, on `case ON_AUTHSTATE_FAIL`, comment out `yield put(signOutSuccess())`.
4. Create a *Storage* in your Firebase Console.
5. Set Storage Rule to public, change `allow read, write: if request.auth != null;` to only `allow read, write;` 
6. Delete persisting auth state in localStorage if one exists.
*Revert on doing all these if you want to switch back to default user and when you are deploying the app* 


### Features

* Admin CRUD operations
* Firebase authentication
* Firebase auth provider authentication
* Account creation and edit

