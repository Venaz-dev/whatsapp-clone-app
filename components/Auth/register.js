import React, { useState, useEffect } from "react";
import firebase from "../../services/firebase";
import store from "../../store/store";

const Register = ({ login }) => {
  const storage = firebase.storage();
  const [userNames, setUserNames] = useState([]);
  let profilePath = storage.refFromURL(
    "https://firebasestorage.googleapis.com/v0/b/dev-chat-9be95.appspot.com/o/new_profile.png?alt=media&token=5e614ba2-60d2-44d9-9678-c6b3125b128b"
  );

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
    loading: false,
    usersRef: firebase.database().ref("users"),
    userNameRef: firebase.database().ref("usernames"),
    userExists: false,
  });

  const getUsername = () => {
    let usernames = [];
    firebase
      .database()
      .ref("usernames")
      .on("child_added", (snap) => {
        usernames.push(snap.val());
        setUserNames([...usernames]);
      });
    console.log("users", usernames);
  };

  const checkUsername = () => {
    let users = userNames.filter((user) => user.username === state.username.toLowerCase());
    console.log(users);
    if (users.length !== 0) {
      setState({ ...state, userExists: true });
    } else {
      setState({ ...state, userExists: false });
    }
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const isFormValid = () => {
    let errors = [];
    let error;

    if (isFormEmpty(state)) {
      error = { message: "Fill in all fields" };
      setState({ ...state, errors: errors.concat(error) });

      return false;
    } else if (!isPasswordValid(state)) {
      error = { message: "Password is invalid! Must be at least 6 Characters" };
      setState({ ...state, errors: errors.concat(error) });
      return false;
    }
    // } else if (!this.isPasswordMatch(this.state)) {
    //   error = { message: "Password does not match!" };
    //   this.setState({ errors: errors.concat(error) });
    //   return false;
    // }
    else {
      return true;
    }
  };

  const saveUser = (createdUser) => {
    return state.usersRef.child(createdUser.user.uid).set(
      {
        name: createdUser.user.displayName,
        avatar: createdUser.user.photoURL,
        id: createdUser.user.uid,
      },
      console.log("added user")
    );
  };

  const saveUsername = (createdUser) => {
    return state.userNameRef.child(createdUser.user.uid).set(
      {
        username: createdUser.user.displayName,
        
      },
      console.log("added user")
    );
  }

  const isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  const isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else {
      return true;
    }
  };

  //   const isPasswordMatch = ({ password, passwordConfirmation }) => {
  //     if (password !== passwordConfirmation) {
  //       return false;
  //     }
  //   };

  const displayErrors = (errors) =>
    errors.map((error, i) => (
      <h4 className="errors" key={i}>
        {error.message}
      </h4>
    ));

  const handleSubmit = (event) => {
    store.loading = true;
    event.preventDefault();
    console.log(state);
    if (isFormValid()) {
      setState({ ...state, errors: [], loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(state.email, state.password)
        .then((createdUser) => {
          createdUser.user
            .updateProfile({
              displayName: state.username.toLowerCase(),
              photoURL: `https://firebasestorage.googleapis.com/v0/b/dev-chat-9be95.appspot.com/o/new_profile.png?alt=media&token=5e614ba2-60d2-44d9-9678-c6b3125b128b`,
            })
            .then(() => {
              console.log("updateduser", createdUser.displayName);
              saveUser(createdUser).then(() => {
                console.log("user saved");
              });
              saveUsername(createdUser).then(() => {
                console.log("username saved");
              });
              store.loading = false;
            })
            .catch((err) => {
              console.error(err);
              setState({
                ...state,
                errors: state.errors.concat(err),
                loading: false,
              });
              store.loading = false;
            });
        })
        .catch((err) => {
          console.error(err);
          setState({
            errors: state.errors.concat(err),
            loading: false,
          });
          store.loading = false;
        });
    } else {
      store.loading = false;
    }
  };

  useEffect(() => {
    getUsername();
  }, []);

  useEffect(() => {
    checkUsername();
  }, [state.username])

  return (
    <div className="register-container">
      <div className="image-container">
        <img
          src={require("../../public/assets/auth-assets/placeholder.png")}
          alt=""
        />
      </div>
      <div className="form-container">
        <div className="form-holder">
          <h1>Sign up for free.</h1>
          {/* <div className="socials">
            <button className="google">via Google</button>
            <button className="github">via Github</button>
          </div>
          <p>or</p> */}

          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="input-holder username icon">
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                value={state.username}
              />
            </div>
            {state.userExists ? (
              <p className="error">Username already exists.</p>
            ) : null}
            <div className="input-holder email icon">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="email "
                onChange={handleChange}
                value={state.email}
              />
            </div>
            <div className="input-holder password icon">
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={state.password}
              />
            </div>
            <div className="input-holder passwordConfirmation icon">
              <input
                type="password"
                name="passwordConfirmation"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={state.passwordConfirmation}
              />
            </div>
            {state.errors.length > 0 && (
              <div>{displayErrors(state.errors)}</div>
            )}

            <button className="submit-btn">Register</button>
          </form>

          <h5>
            Already have an account? &nbsp; <b onClick={login}> Sign in</b>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Register;
