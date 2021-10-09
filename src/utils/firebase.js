import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyChrHl0hT9k2ChWiV9TrxOu_oUisydwS5w",
  authDomain: "quiz-creator-no1.firebaseapp.com",
  projectId: "quiz-creator-no1",
  storageBucket: "quiz-creator-no1.appspot.com",
  messagingSenderId: "839643544278",
  appId: "1:839643544278:web:4dcdaae0da6c19f09da777"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;