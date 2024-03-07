import firebase from 'firebase/app'
import 'firebase/auth'
import { auth } from './firebase' // import your Firebase auth object

const firebaseConfig = {
  // your Firebase configuration
}

export function fetchUser() {
  return auth.currentUser
}

firebase.initializeApp(firebaseConfig)
