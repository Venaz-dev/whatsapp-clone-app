import React, { useEffect, useState, useRef } from "react";
import firebase from "../../services/firebase";
import { useRouter } from "next/router";
import Link from "next/link";

const Index = () => {
  const storageRef = firebase.storage().ref(user + '/profilePicture/');
  const [user, setUser] = useState();
  const [state, setState] = useState({
    displayName: "",
    photoURL: "",
  });
  const router = useRouter();
  const profileRef = useRef();
  const handleClick = () => {
    profileRef.current.click();
  };
  const handleImage = (event) => {
    let file = event.target.files[0];
    if (file) {
      setState({
        ...state,
        photoURL: file,
      });
    }
  };
  const handleChange = (event) => {
    setState({
      ...state,
      displayName: event.target.value,
    });
  };
  const uploadImage = () => {
    storageRef.put(state.photoURL).then(() => {
      console.log('uploaded');
    })
    console.log(state.photoURL.blob);
  }
  const handleSubmit = () => {
    user
      .updateProfile({
        displayName: state.displayName,
        photoURL: state.photoURL
      })
      .then(() => {
        console.log("updated");
        router.push("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setState({
          ...state,
          displayName: user.displayName,
          
        });
      } else {
        router.push("/login");
      }
    });
  }, []);
  return user ? (
    <div className="profile-holder">
      <div>
        <h2 className="title">Update Profile</h2>
        <p>Profile Image</p>
        <div
          style={{ position: "relative", width: "fit-content" }}
          onClick={handleClick}
        >
          <img src={state.photoURL != "" ? URL.createObjectURL(state.photoURL) : user.photoURL} />
          <img
            className="add-icon"
            src={require("../../public/assets/icons/plus.svg")}
          />
          <input
            style={{ display: "none" }}
            ref={profileRef}
            type="file"
            accept="image/*"
            onChange={handleImage}
          />
        </div>
        <p>Username</p>
        <input type="text" value={state.displayName} onChange={handleChange} />
        <div className="btn-holder">
          <button onClick={uploadImage}>Update</button>
          <Link href="/">
            <button style={{ backgroundColor: "#E76E54" }}>Cancel</button>
          </Link>
        </div>
      </div>
    </div>
  ) : null;
};

export default Index;
