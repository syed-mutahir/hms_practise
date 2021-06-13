import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyD3wjhqJ5UwG4M1GPzjoZ2B9hmU7B6l_ck",
    authDomain: "hotel-ms-c2207.firebaseapp.com",
    projectId: "hotel-ms-c2207",
    storageBucket: "hotel-ms-c2207.appspot.com",
    messagingSenderId: "197710030718",
    appId: "1:197710030718:web:539fcbefff8875d5f5352f"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;