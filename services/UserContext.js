import React, { useEffect, useState } from "react";

import cookie from "js-cookie";
import firebase from "./firebase";

export const UserContext = React.createContext();

const tokenName = "firebaseToken";

const UserProvider = ({ children }) => {
  // Basic Firebase email login function.
  const emailLogin = async (email, password, redirectPath) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("User logged in.");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Checks that user state has changed and then creates or destroys cookie with Firebase token.
  const onAuthStateChange = () => {
    return firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        cookie.set(tokenName, token, { expires: 14 });
      } else {
        cookie.remove(tokenName);
      }
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChange();
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ emailLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
