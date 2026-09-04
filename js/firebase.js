// TRB Game Shop - Production Firebase Setup
const firebaseConfig = {
  apiKey: "AIzaSyC5HdPcUSi7lEpqr6d1otemKUuheAqAgts",
  authDomain: "trb-game-shop.firebaseapp.com",
  projectId: "trb-game-shop",
  storageBucket: "trb-game-shop.firebasestorage.app",
  messagingSenderId: "532023327406",
  appId: "1:532023327406:web:499bc5b8956ddd339b8b3f"
};

// Initialize Firebase SDK
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

