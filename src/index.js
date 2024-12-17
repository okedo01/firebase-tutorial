import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc
} from 'firebase/firestore'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'

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
const auth = getAuth()

// collection ref
const colRef = collection(db, 'books')

// queries
const q = query(colRef, orderBy('createdAt'))

// real time collection data
const unsubCol = onSnapshot(q, (snapshot) => {
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
        author: addBookForm.author.value.trim(),
        createdAt: serverTimestamp()
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

// get a single document
const docRef = doc(db, "books", "SxHqXJ9IIZNuH3ZYN1Q2")
const unsubDoc = onSnapshot(docRef, doc => {
    console.log(doc.data(), doc.id);
})

// updating a document
const updateForm = document.querySelector('.update')
updateForm.addEventListener("submit", e => {
    e.preventDefault()

    const docRef = doc(db, "books", updateForm.id.value)

    updateDoc(docRef, {
        title: "updated document"
    })
    .then(doc => {
        updateForm.reset()
    })
})

// signing up users
const signupForm = document.querySelector('.signup')
signupForm.addEventListener("submit", e => {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('user created: ', cred.user);
            signupForm.reset()
        }) .catch(err => {
            console.log(err.message);
        })
})

// loging in and out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {

    signOut(auth)
        .then(() => {
            // console.log("the user signed out");
        })
        .catch(err => {
            console.log(err.message);
        })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', e => {
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value

    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            // console.log('user logged in: ', cred.user);
            loginForm.reset()
        }) .catch(err =>{
            console.log(err.message);
        })
})

// subscribing to auth changes
const unsubAuth = onAuthStateChanged(auth, (user) => {
    console.log("user status changed: ", user);
})

// unsubscribing from changes(db & auth)
const unsubButton = document.querySelector('.unsub')
unsubButton.addEventListener('click', () => {
    console.log("unsubscribing");
    unsubCol()
    unsubDoc
    unsubAuth
})