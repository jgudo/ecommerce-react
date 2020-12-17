import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { IUser, IProduct } from 'types/types';

const firebaseConfig: Record<string, string | undefined> = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DB_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID
};

class Firebase {
	public storage: app.storage.Storage;
	public db: app.firestore.Firestore;
	public auth: app.auth.Auth;

	constructor() {
		app.initializeApp(firebaseConfig);

		this.storage = app.storage();
		this.db = app.firestore();
		this.auth = app.auth();
	}

	// AUTH ACTIONS
	// -------

	public createAccount = (email: string, password: string) =>
		this.auth.createUserWithEmailAndPassword(email, password)

	public signIn = (email: string, password: string) =>
		this.auth.signInWithEmailAndPassword(email, password)

	public signInWithGoogle = () =>
		this.auth.signInWithPopup(new app.auth.GoogleAuthProvider())

	public signInWithFacebook = () =>
		this.auth.signInWithPopup(new app.auth.FacebookAuthProvider())

	public signInWithGithub = () =>
		this.auth.signInWithPopup(new app.auth.GithubAuthProvider())

	public signOut = () => this.auth.signOut();

	public passwordReset = (email: string) =>
		this.auth.sendPasswordResetEmail(email)

	public addUser = (id: string, user: IUser) =>
		this.db.collection('users').doc(id).set(user)

	public getUser = (id: string) => this.db.collection('users').doc(id).get();

	public passwordUpdate = (password: string): Promise<void> =>
		this.auth.currentUser
			? this.auth.currentUser.updatePassword(password)
			: Promise.resolve()

	public changePassword = (currentPassword: string, newPassword: string) => {
		return new Promise((resolve, reject) => {
			this.reauthenticate(currentPassword).then(() => {
				const user = this.auth.currentUser;

				if (user) {
					user.updatePassword(newPassword)
						.then(() => {
							resolve('Password updated successfully!');
						})
						.catch(error => reject(error));
				}
			}).catch(error => reject(error));
		});
	}

	public reauthenticate = (currentPassword: string) => {
		const user: any = this.auth.currentUser;

		if (!user) {
			throw new Error('User not authenticated.');
		} else {
			const cred = app.auth.EmailAuthProvider.credential(user.email, currentPassword);
			return user.reauthenticateWithCredential(cred);
		}
	}

	public updateEmail = (currentPassword: string, newEmail: string) => {
		return new Promise((resolve, reject) => {
			this.reauthenticate(currentPassword).then(() => {
				const user = this.auth.currentUser;

				if (user) {
					user.updateEmail(newEmail)
						.then(() => {
							resolve('Email Successfully updated');
						})
						.catch(error => reject(error));
				}
			}).catch(error => reject(error));
		});
	}

	public updateProfile = (id: string, updates: Partial<IUser>) => this.db.collection('users').doc(id).update(updates);

	public onAuthStateChanged = () => {
		return new Promise((resolve, reject) => {
			this.auth.onAuthStateChanged((user) => {
				if (user) {
					resolve(user);
				} else {
					reject(new Error('Auth State Changed failed'));
				}
			});
		});
	}

	saveBasketItems = (items: IProduct[], userId: string) => this.db.collection('users').doc(userId).update({ basket: items });

	public setAuthPersistence = () => this.auth.setPersistence(app.auth.Auth.Persistence.LOCAL);

	// // PRODUCT ACTIONS
	// // ---------
	getProduct = (id: string) => this.db.collection('products').doc(id).get();

	public getProducts = (lastRefKey: string) => {
		let didTimeout = false;

		return new Promise(async (resolve, reject) => {
			if (lastRefKey) {
				try {
					const query = this.db.collection('products').orderBy(app.firestore.FieldPath.documentId()).startAfter(lastRefKey).limit(12);
					const snapshot = await query.get();
					let products: Partial<IProduct>[] = [];
					snapshot.forEach((doc) => {
						products = products.concat([{ id: doc.id, ...doc.data() }]);
					});
					const lastKey = snapshot.docs[snapshot.docs.length - 1];

					resolve({ products, lastKey });
				} catch (e) {
					reject(new Error(':( Failed to fetch products.'));
				}
			} else {
				const timeout = setTimeout(() => {
					didTimeout = true;
					reject(new Error('Request timeout, please try again'));
				}, 15000);

				try {
					// getting the total count of data

					// adding shallow parameter for smaller response size
					// better than making a query from firebase
					// NOT AVAILEBLE IN FIRESTORE const request = await fetch(`${process.env.FIREBASE_DB_URL}/products.json?shallow=true`);

					const totalQuery = await this.db.collection('products').get();
					const total = totalQuery.docs.length;
					const query = this.db.collection('products').orderBy(app.firestore.FieldPath.documentId()).limit(12);
					const snapshot = await query.get();

					clearTimeout(timeout);
					if (!didTimeout) {
						let products: Partial<IProduct>[] = [];
						snapshot.forEach((doc) => {
							products = products.concat([{ id: doc.id, ...doc.data() }]);
						});
						const lastKey = snapshot.docs[snapshot.docs.length - 1];

						resolve({ products, lastKey, total });
					}
				} catch (e) {
					if (didTimeout) return;
					console.log('Failed to fetch products: An error occured while trying to fetch products or there may be no product ', e);
					reject(new Error(':( Failed to fetch products.'));
				}
			}
		});
	}

	public addProduct = (id: string, product) => this.db.collection('products').doc(id).set(product);

	public generateKey = () => this.db.collection('products').doc().id;

	public storeImage = async (id: string, folder: string, imageFile: File) => {
		const snapshot = await this.storage.ref(folder).child(id).put(imageFile);
		const downloadURL = await snapshot.ref.getDownloadURL();

		return downloadURL;
	}

	public deleteImage = (id: string) => this.storage.ref('products').child(id).delete();

	public editProduct = (id: string, updates) => this.db.collection('products').doc(id).update(updates);

	public removeProduct = (id: string) => this.db.collection('products').doc(id).delete();
}

const firebase = new Firebase();

// If you want to add a new field to every single document, run this
// delete or comment after first run or it may override what you have edited on first run.

// (async function () {
// 	const col = await firebase.db.collection('users').get();
// 	col.forEach((doc) => {
// 		doc.ref.update({
// 			mobile: { data: {} }
// 		});
// 	});
// })();

export default firebase;
