// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCnl2qwFBO_NhirAcjouYYPvhwAh0EMNf8',
  authDomain: 'pfpbase-1cbc7.firebaseapp.com',
  projectId: 'pfpbase-1cbc7',
  storageBucket: 'pfpbase-1cbc7.appspot.com',
  messagingSenderId: '706146452374',
  appId: '1:706146452374:web:33689d2beaa9e42e0fd3b7',
  measurementId: 'G-K3PVSGV0MJ',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
