import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyDZWk4C3vDYniFWZ0uJv1E8qVeOrICsqlQ",
    authDomain: "ati-ii-react-crud-db.firebaseapp.com",
    databaseURL: "https://ati-ii-react-crud-db.firebaseio.com",
    projectId: "ati-ii-react-crud-db",
    storageBucket: "ati-ii-react-crud-db.appspot.com",
    messagingSenderId: "519743112142",
    appId: "1:519743112142:web:c36a47bb89c2ff9272a19f",
    measurementId: "G-3V3H5EHLPW" 
};

firebase.initializeApp(config);
firebase.firestore().settings(settings);

export default firebase;