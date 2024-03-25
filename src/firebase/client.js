import { initializeApp } from 'firebase/app';
import {
  GithubAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

import {
  getDownloadURL,
  getStorage,
  ref as imgRef,
  uploadBytesResumable,
} from 'firebase/storage';

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();

function Logout() {
  return auth.signOut();
}

function MapUser(user) {
  const { displayName, email, photoURL, uid, reloadUserInfo } = user;

  const body = {
    name: displayName,
    username: reloadUserInfo.screenName,
    email,
    photo: photoURL,
    id: uid,
  };

  return body;
}

function CheckUserIsLogged(callback) {
  return onAuthStateChanged(auth, (user) => {
    const normalizedUser = user ? MapUser(user) : null;

    callback(normalizedUser);
  });
}

async function LoginWithGitHub() {
  const provider = new GithubAuthProvider();
  return signInWithPopup(auth, provider).then((user) => {
    const data = user.user;
    const { displayName, email, photoURL, uid, reloadUserInfo } = data;

    const body = {
      name: displayName,
      username: reloadUserInfo.screenName,
      email,
      photo: photoURL,
      id: uid,
    };

    return body;
  });
}

// Collections
const TwioCollection = collection(db, 'tweets');

async function AddTwio({
  content,
  photo,
  userid,
  name,
  username,
  tweetimg,
  email,
  data,
}) {
  try {
    return await addDoc(TwioCollection, {
      content,
      photo,
      userid,
      name,
      username,
      tweetimg,
      email,
      timestamp: Date.now(),
      data: {
        likes: data.likes,
        retweets: data.retweets,
        comments: data.comments,
        analitics: data.analitics,
      },
    });
  } catch (error) {
    throw new Error('Error adding document:', error);
  }
}

async function Deletedoc({ id }) {
  const document = doc(db, 'tweets', id);
  return await deleteDoc(document);
}

async function GetDoc({ id }) {
  const document = doc(db, 'tweets', id);
  const docSnap = await getDoc(document);

  if (docSnap.exists()) {
    return docSnap.data();
  }
  console.log('No such document!');
  return null;
}

// Fetch to a twio by id of an user
async function GetTwiosByUser({ userid }) {
  const q = query(collection(db, 'tweets'), where('userid', '==', userid));

  const querySnapshot = await getDocs(q);
  const docs = [];

  querySnapshot.forEach((doc) => {
    docs.push({ ...doc.data(), id: doc.id });
  });

  const newDocs = docs.sort((a, b) => b.timestamp - a.timestamp);
  return newDocs;
}

const listenLastTwios = (callback) => {
  const q = query(TwioCollection);

  return onSnapshot(q, (querySnapshot) => {
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });

    const newDoc = docs.sort((a, b) => b.timestamp - a.timestamp);
    callback(newDoc);
  });
};

function UploadImage(file) {
  return new Promise((resolve, reject) => {
    const ref = imgRef(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(ref, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
}

export {
  AddTwio,
  CheckUserIsLogged,
  Deletedoc,
  LoginWithGitHub,
  Logout,
  UploadImage,
  GetDoc,
  listenLastTwios,
  GetTwiosByUser,
};
export default app;
