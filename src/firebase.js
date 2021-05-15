import { firebase } from '@firebase/app'
import '@firebase/firestore'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCycsuX6iiBI-wXrFnU7EWc1XGekSgZlLE',
  authDomain: 'corona-991fe.firebaseapp.com',
  projectId: 'corona-991fe',
  storageBucket: 'corona-991fe.appspot.com',
  messagingSenderId: '349575817207',
  appId: '1:349575817207:web:64a2ba015c857bf33830f2',
  measurementId: 'G-GG7PE83S3T'
})

export const db = firebaseApp.firestore()
