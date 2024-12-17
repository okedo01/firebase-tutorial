import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc
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

// real time collection data
onSnapshot(colRef, (snapshot) => {
  let books = [];
  snapshot.docs.forEach(doc => {
      books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books);
})

//   adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    addDoc(colRef, {
        title: addBookForm.title.value.trim(),
        author: addBookForm.author.value.trim()
    }) .then(() =>[
        addBookForm.reset()
    ])
})

// deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const docRef = doc(db, 'books', deleteBookForm.id.value)

    deleteDoc(docRef)
        .then(() => {
            deleteBookForm.reset()
        })
})