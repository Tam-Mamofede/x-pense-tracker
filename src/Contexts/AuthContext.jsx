import React, { createContext, useContext, useState } from "react";
import { auth, googleProvider, db } from "../../Config/firebase.config";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const [userName, setUserName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

//   const handleSubmitName =  () => {
//     setUserName();
//     const addUserNameToDocument = async (docId) => {
//       try {
//         await firestore.collection("users").doc(docId).update({
//           userName: userName,
//         });
//         console.log("Field added successfully!");
//       } catch (error) {
//         console.error("Error adding field: ", error);
//       }
//       addUserNameToDocument()
//     };

//   };
