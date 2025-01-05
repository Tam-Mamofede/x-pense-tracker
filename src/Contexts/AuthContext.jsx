/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState } from "react";
import { auth, googleProvider, db } from "../../firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const navigate = useNavigate();
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [blurBg, setBlurBg] = useState(false);
  const [openInputs, setOpenInputs] = useState(false);
  const [logInEmail, setLogInEmail] = useState("");
  const [logInPassword, setLogInPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [darkmode, setDarkmode] = useState(false);

  //sign up with email and password
  const createAccount = async () => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
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

      setAlertMessage("Sign up successful"); // proof
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  //sign in with google account

  const createAccountWithGoogle = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  ///////////////////////////////////////////////
  const handleSetName = (e) => {
    const value = e.target.value;
    // Capitalize the first letter
    const capitalizedValue =
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    setUserName(capitalizedValue);
    setBlurBg(true);
    setOpenInputs(true);
  };

  //////////////////////////////////////////////////

  const logOut = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
      setSelectedMonth("");
      setAlertMessage("You have successfully logged out.");

      navigate("/");
    } catch (err) {
      console.error("Logout Error:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  ///////////////////////////////////////////

  const logIn = async () => {
    setIsLoading(true);
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
      setAlertMessage("Login failed: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleDarkmode = () => {
    setDarkmode(!darkmode);
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
          openLogin,
          setOpenLogin,
          blurBg,
          setBlurBg,
          openInputs,
          setOpenInputs,
          openSignUp,
          setOpenSignUp,
          alertMessage,
          setAlertMessage,
          isLoading,
          setIsLoading,
          darkmode,
          setDarkmode,
          handleToggleDarkmode,
        }}
      >
        {/* Render the Global Alert */}
        <Alert
          message={alertMessage}
          clearMessage={() => setAlertMessage("")} // Clear message function
        />
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
