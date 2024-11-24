import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, googleProvider, db } from "../../Config/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

///////////////////////////////////////////////
function AuthProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");

  const navigate = useNavigate();

  // Set up listener for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true); // User is logged in
      } else {
        setUser(null);
        setIsAuthenticated(false); // User is logged out
      }
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  // Sign up function
  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, "users", newUser.uid), {
        email: newUser.email,
        createdAt: new Date(),
        name: userName || "New User",
      });
      setUser(newUser);
      setIsAuthenticated(true);
      navigate("/dashboard"); // Redirect to dashboard after signup
    } catch (err) {
      console.error("Signup Error:", err.message);
    }
  };

  // Google Sign-up/Login
  const signUpWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const newUser = userCredential.user; // Use userCredential.user instead of result.user

      // Ensure displayName fallback
      const displayName = newUser.displayName || "Google User";

      // Save user data to Firestore
      await setDoc(doc(db, "users", newUser.uid), {
        email: newUser.email,
        createdAt: new Date(),
        name: displayName,
      });

      setUser(newUser);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (err) {
      console.error("Google Signup Error:", err.message);
      alert("Google sign-up failed: " + err.message);
    }
  };

  // Login function
  const logIn = async () => {
    try {
      const { email, password } = authState;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Fetch user data from Firestore
      const userDocRef = doc(db, "users", loggedInUser.uid);
      const userDoc = await getDoc(userDocRef);

      const loggedInUser = userCredential.user;
      setUser(loggedInUser);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setFirstName(userData.name);
      } else {
        alert("No user data found in Firestore.");
      }

      setIsAuthenticated(true);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err.message);
      alert("Login failed: " + err.message);
    }
  };

  // Logout function
  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
      alert("You have successfully logged out.");

      navigate("/"); // Redirect to login after logout
    } catch (err) {
      console.error("Logout Error:", err.message);
    }
  };

  // Provide context values
  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        signUp,
        signUpWithGoogle,
        logOut,
        isAuthenticated,
        logIn,
        firstName,
        setUserName,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use Auth context
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
