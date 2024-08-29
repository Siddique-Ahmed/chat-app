import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, setDoc, doc, collection, query, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyA4zsVVE5pErhPHbPHeo_yj5PsafDrixXM",
  authDomain: "chat-app-fc180.firebaseapp.com",
  projectId: "chat-app-fc180",
  storageBucket: "chat-app-fc180.appspot.com",
  messagingSenderId: "460538437161",
  appId: "1:460538437161:web:ad33cb3ce1c52036818638",
  measurementId: "G-P9QSP2KSBE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey, There i am using chat app",
      lastSeen: Date.now(),
    });
    await setDoc(doc(db, "chats", user.uid), {
      chatsData: [],
    });
  } catch (error) {
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const resetPass = async (email)=>{
  if(!email){
    toast.error("Enter your email");
    return null;
  }
  try {
    const userRef = collection(db,"users");
    const q = query(userRef,where("email", "==", email));
    const querySnap = await getDocs(q);
    if(!querySnap.empty){
      await sendPasswordResetEmail(auth,email);
      toast.success("Reset Email Send")
    }
    else{
      toast.error("Email donesn't exists")
    }
  } catch (error) {
    toast.error(error.message)
  }
}

export { signup, login, logout, auth, db, resetPass};
