import Rebase from 're-base';
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyC-inU0D8p15gTeN0Tv_IWXZLoM4jiNp-M",
  authDomain: "my-beersdb.firebaseapp.com",
  databaseURL: "https://my-beersdb.firebaseio.com",
  projectId: "my-beersdb",
  storageBucket: "my-beersdb.appspot.com",
  messagingSenderId: "1074223580661"
};

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());
const googleProvider = new firebase.auth.GoogleAuthProvider();
const ref = firebase.app().database().ref();

export { app, base, googleProvider, ref }