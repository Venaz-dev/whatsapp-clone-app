import React, { useEffect, useState, useRef } from "react";
import firebase from "../../services/firebase";
import { useRouter } from "next/router";
import Link from "next/link";

const Index = () => {
  // const storageRef = firebase.storage().ref() || "";
  const [user, setUser] = useState();
  const [state, setState] = useState({
    displayName: "",
    file: "",
    photoURL: "",
    storageRef: "",
    userRef: "",
    metadata: {
      contentType: "image/jpeg",
    },
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
        file: file,
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
    if (state.file != "") {
      console.log("starting");
      state.storageRef
        .child(`avatars/user-${user.uid}`)
        .put(state.file, state.metadata)
        .then((snap) => {
          snap.ref.getDownloadURL().then((downloadURL) => {
           
            
            setState({
              ...state, 
              photoURL: downloadURL
            })
            updateAvatar(downloadURL)
            updateUserList(downloadURL)
            handleSubmit()
          })
          
        })
        .catch(err => {
          console.error(err);
        })

      
    }else{
      handleSubmit()
    }
  };

  const updateUserList = (url) => {
    state.userRef
      .child(user.uid)
      .update({
        avatar: url,
        name: state.displayName
      })
      .then(() => {
        console.log("successful");
      })
      .catch((err) => {
        console.error(err);
      })
  }
  const updateAvatar = (url) => {
    user.updateProfile({
      photoURL: url
    })
    .then(() => {
      console.log("avatar updated");
    })
    .catch((err) => {
      console.error(err);
    })
  }
  const handleSubmit = () => {
    user
      .updateProfile({
        displayName: state.displayName,
        photoURL: state.photoURL,
      })
      .then(() => {
        console.log("updated");
        // router.push("/");
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
          storageRef: firebase.storage().ref(),
          photoURL: user.photoURL,
          userRef: firebase.database().ref("users")
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
          style={{
            position: "relative",
            width: "fit-content",
            cursor: "pointer",
          }}
          onClick={handleClick}
        >
          <img
            src={
              state.file != "" ? URL.createObjectURL(state.file) : user.photoURL
              
            }
          />
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
