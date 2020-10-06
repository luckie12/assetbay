import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDmemW-M1-VYrf91kBCfahIxCHGtDF66YU",
    authDomain: "tykes-46705.firebaseapp.com",
    databaseURL: "https://tykes-46705.firebaseio.com",
    projectId: "tykes-46705",
    storageBucket: "tykes-46705.appspot.com",
    messagingSenderId: "432420577533",
    appId: "1:432420577533:web:70f081429e923a35409e94",
    measurementId: "G-1F90PL96LC"
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()