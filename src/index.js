import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCBVKOnMb0VZrBC42jB3HQ2oLlXJAxla5k",
    authDomain: "fir-dojo-72da7.firebaseapp.com",
    projectId: "fir-dojo-72da7",
    storageBucket: "fir-dojo-72da7.firebasestorage.app",
    messagingSenderId: "689151240277",
    appId: "1:689151240277:web:4abd33879b6ae20058ccdc"
  };

//   init database app
initializeApp(firebaseConfig);

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'books')

// get collection data
getDocs(colRef)
  .then(snapshots => {
    let books = [];
    snapshots.docs.forEach(doc => {
        books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books);
    
  }) .catch(error => {
    console.log(error.message);
  })

//   adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
})

// deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
})