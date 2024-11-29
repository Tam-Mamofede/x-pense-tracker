import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider, db } from "../../Config/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [logInEmail, setLogInEmail] = useState("");
  const [logInPassword, setLogInPassword] = useState("");
  //sign up with email and password
  const createAccount = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setIsAuthenticated(true);
      const newUser = userCredential.user;

      //try to store it in Firestore
      setDoc(doc(db, "users", newUser.uid), {
        email: newUser.email,
        name: userName,
        password: password, //these can be increased for any future inputs
      });

      setUser(newUser);
      navigate("/dashboard");
      const userDocRef = doc(db, "users", newUser.uid); //getting the newly created document under ' users' collection
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data(); // get user data from new document
        console.log(userData);
      }

      alert("sign up successful"); // proof
    } catch (err) {
      console.error(err);
    }
  };

  //sign in with google account

  const createAccountWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const newUser = userCredential.user;

      //try to store it in Firestore
      setDoc(doc(db, "users", newUser.uid), {
        email: newUser.email,
        name: userName,
      });

      setUser(newUser);
      setIsAuthenticated(true);
      navigate("/dashboard");
      const userDocRef = doc(db, "users", newUser.uid); //getting the newly created document under ' users' collection
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data(); // get user data from new document
        console.log(userData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
      alert("You have successfully logged out.");

      navigate("/sign-up");
    } catch (err) {
      console.error("Logout Error:", err.message);
    }
  };

  ///////////////////////////////////////////

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, logInEmail, logInPassword);
      setIsAuthenticated(true);
      setUser(auth.currentUser);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err.message);
      alert("Login failed: " + err.message);
    }
  };

  //Monitor auth state
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
  //     if (firebaseUser) {
  //       try {
  //         // Fetch user data from Firestore
  //         const userDocRef = doc(db, "users", firebaseUser.uid);
  //         const userDoc = await getDoc(userDocRef);

  //         if (userDoc.exists()) {
  //           // Combine Firebase Auth data with Firestore data
  //           // setUser({ uid: firebaseUser.uid, ...userDoc.data() });
  //           setIsAuthenticated(true);
  //         } else {
  //           console.error("User document not found in Firestore.");
  //           setUser(firebaseUser); // At least set the basic Firebase Auth user data
  //           setIsAuthenticated(true);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user document:", error.message);
  //       }
  //     } else {
  //       // No user is logged in
  //       setUser(null);
  //       setIsAuthenticated(false);
  //     }
  //   });

  // //Cleanup the subscription on component unmount
  //   return () => unsubscribe();
  // }, []);

  // const testFetch = async () => {
  //   const docRef = doc(db, `users/${user.uid}/budgets`); // Replace user-id
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     console.log("Document Data:", docSnap.data());
  //   } else {
  //     console.log("No such document!");
  //   }
  // };
  // testFetch();

  return (
    <div>
      <AuthContext.Provider
        value={{
          email,
          setEmail,
          password,
          setPassword,
          userName,
          setUserName,
          user,
          setUser,
          isAuthenticated,
          setIsAuthenticated,
          createAccount,
          createAccountWithGoogle,
          logOut,
          logIn,
          logInEmail,
          setLogInEmail,
          logInPassword,
          setLogInPassword,
        }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
