import Firebase from ‘firebase’;

const firebaseConfig = {
    apiKey: 'AIzaSyDUiym4qewXHdL0qoJS357s-4xcxTy2ILw',
    databaseURL: 'https://scopictest-84c39-default-rtdb.firebaseio.com/',
    projectId: 'scopictest-84c39',
    storageBucket: '',
    appId: '',
};

export default Firebase.initializeApp(firebaseConfig);