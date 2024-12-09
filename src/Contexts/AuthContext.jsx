import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider, db } from "../../Config/firebase.config";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
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
  const [selectedMonth, setSelectedMonth] = useState("");
  const navigate = useNavigate();

  const [logInEmail, setLogInEmail] = useState("");
  const [logInPassword, setLogInPassword] = useState("");

  const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours duration of log in
  // Set session persistence
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch((error) =>
      console.error("Persistence error:", error)
    );
  }, []);

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const loginTime = localStorage.getItem("loginTime");
        if (loginTime && new Date().getTime() - loginTime > SESSION_DURATION) {
          logOut(); // Log out if session expired
        } else {
          setUser(currentUser);
          setIsAuthenticated(true);
          localStorage.setItem("loginTime", new Date().getTime());
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return unsubscribe;
  }, []);

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
      const inputedMonth = prompt("Which month do you want to see?");
      {
        inputedMonth ? setSelectedMonth(inputedMonth) : "";
      }
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

  ///////////////////////////////////////////////
  const handleSetName = (e) => {
    const value = e.target.value;
    // Capitalize the first letter
    const capitalizedValue =
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    setUserName(capitalizedValue);
  };

  //////////////////////////////////////////////////

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
      setSelectedMonth("");
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
      const inputedMonth = prompt("Which month do you want to see?");
      if (inputedMonth) {
        // Capitalize the first letter and make the rest lowercase
        const formattedMonth =
          inputedMonth.charAt(0).toUpperCase() +
          inputedMonth.slice(1).toLowerCase();
        setSelectedMonth(formattedMonth);
      } else {
        setSelectedMonth("");
      }
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err.message);
      alert("Login failed: " + err.message);
    }
  };

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
          selectedMonth,
          setSelectedMonth,
          handleSetName,
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
