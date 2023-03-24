import { initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCXlSlx5fZZWWYUVumVis8X3ae4qwcSrSc",
    authDomain: "tickets-cd835.firebaseapp.com",
    projectId: "tickets-cd835",
    storageBucket: "tickets-cd835.appspot.com",
    messagingSenderId: "361759247063",
    appId: "1:361759247063:web:1fb486bf77f469e5d2be92"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  export { auth, db, storage };