import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDCebA5gKPVFBna_3yi_kaDKtb1pbDCtjc",
  authDomain: "champions-youth.firebaseapp.com",
  databaseURL: "https://champions-youth.firebaseio.com",
  projectId: "champions-youth",
  storageBucket: "champions-youth.appspot.com",
  messagingSenderId: "1030411793669",
  appId: "1:1030411793669:web:6ac463c53c1e1183e7336c",
  measurementId: "G-933NKS8F2D"
};



// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

firebase.firestore();
export default firebase;