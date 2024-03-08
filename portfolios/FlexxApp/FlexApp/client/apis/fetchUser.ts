import firebase from 'firebase/app'
import 'firebase/auth'
import * as admin from 'firebase-admin'
//need oath object:
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  updateEmail,
  deleteUser,
  updatePassword,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

export const firebaseConfig = {
  apiKey: 'AIzaSyCnl2qwFBO_NhirAcjouYYPvhwAh0EMNf8',
  authDomain: 'pfpbase-1cbc7.firebaseapp.com',
  projectId: 'pfpbase-1cbc7',
  storageBucket: 'pfpbase-1cbc7.appspot.com',
  messagingSenderId: '706146452374',
  appId: '1:706146452374:web:b7abd504690adf060fd3b7',
  measurementId: 'G-2YK8188EQ2',
}

firebase.initializeApp(firebaseConfig)

const auth = getAuth()
const user = auth.currentUser

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    let user = userCredential.user
    console.log(user.uid)
    console.log(user.displayName)
    console.log(user.email)
    console.log(user.photoURL)
  } catch (error) {
    console.log(error)
  }
}

function getASecureRandomPassword() {
  let arr = new Uint32Array(1)
  window.crypto.getRandomValues(arr)
  return arr[0].toString(36)
}

signUp('Test@Meow.com', 'CleverPassword')

export const signIn = async (email: string, password: string) => {
  try {
    const signIn = await signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        let user = userCredential.user
      }
    )
  } catch (error) {
    console.log(error)
  }
}

if (user !== null) {
  // The user object has name, email, etc.
  const displayName = user.displayName
  const email = user.email
  const photoURL = user.photoURL
  const emailVerified = user.emailVerified

  updateProfile(user, {
    displayName: 'Jane Q. User',
    photoURL: 'https://example.com/jane-q-user/profile.jpg',
  }).then(() => {
    return 'profile updated'
  })

  if (user !== null) {
    user.providerData.forEach((profile) => {
      console.log('Sign-in provider: ' + profile.providerId)
      console.log('  Provider-specific UID: ' + profile.uid)
      console.log('  Name: ' + profile.displayName)
      console.log('  Email: ' + profile.email)
      console.log('  Photo URL: ' + profile.photoURL)
    })
  }

  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getToken() instead.
  const uid = user.uid
}

auth.languageCode = 'it'

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid
    return `${user} signed in`
  } else {
    return 'Signed Out'
  }
})

const newPassword = getASecureRandomPassword()

export const deleteCurrentUser = async () => {
  if (user) {
    try {
      await deleteUser(user)
      console.log('User deleted.')
    } catch (error) {
      console.log('Error deleting user:', error)
    }
  } else {
    console.log('No user to delete')
  }
}

let uid: string

export const updateUserPassword = async (iud: string, newPassword: string) => {
  if (user) {
    try {
      await admin.auth().updateUser(uid, {
        password: newPassword,
      })
      console.log('successfully updated user password')
    } catch (error) {
      console.log('Error updating password:', error)
    }
  } else {
    console.log('No user logged in')
  }
}

export const emailVerify = async () => {
  if (user) {
    await sendEmailVerification(auth.currentUser).then(() => {})
  }
}

export function fetchUser() {
  return auth.currentUser
}

//Initialising
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
