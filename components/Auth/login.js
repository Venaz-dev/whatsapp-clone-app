import React, { useState, useEffect } from "react";
import firebase from "../../services/firebase";

import { useRouter } from "next/router";

const Login = ({ signup }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [state, setState] = useState({
    email: "",
    password: "",
    errors: [],
    loading: false,
  });
  // const handleSignout = () => {
  //   firebase
  //     .auth()
  //     .signOut()
  //     .then(() => console.log("signed out!"));
  // };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
    
    // handleSignout()
  };

  const displayErrors = (errors) => {
    errors.map((error, i) => <h4 className="errors" key={i}>{error.message}</h4>);
  
    // console.log('hi', errors[0].message)
  };

  const isFormValid = ({ email, password }) => email && password;

  const handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid(state)) {
      setState({ ...state, errors: [], loading: true });

      firebase
        .auth()
        .signInWithEmailAndPassword(state.email, state.password)
        .then((signedInUser) => {
          console.log(signedInUser);
          setUser(firebase.auth().currentUser);
        })
        .catch((err) => {
          console.error(err);
          setState({
            ...state,
            errors: state.errors.concat(err),
            loading: false,
          });
        });
    }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        router.push("/");
        //   handleSignout()
        //   this.props.setUser(user);
        //   this.props.history.push("/");
      } else {
        //   this.props.history.push("/login");
        //   this.props.clearUser();
      }
    });
    // if (user) {
    //   router.push('/')
    // }
  });
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
          <h1>Login to DevChat.</h1>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="input-holder email icon">
              <input
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                value={state.email}
                //className={this.handleInputError(errors, "email")}
                type="email"
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

            {
              // state.errors ?
              <div>{displayErrors(state.errors)}</div>
              // : null
              // <div><h4 className="errors">hhhhh</h4></div>
            }
            {state.errors.length > 0 &&
              state.errors.map((error, i) => (
                <h4 className="errors" key={i}>
                  {" "}
                  {error.message}{" "}
                </h4>
              ))}

            <button
              disabled={state.loading}
              className={"submit-btn"}
              color="green"
              //   fluid
              size="large"
            >
              {state.loading ? (
                <img
                  className="loader"
                  src={require("../../public/assets/icons/loading_black.svg")}
                />
              ) : (
                "Login"
              )}
            </button>
          </form>

          <h5>
            Don't have an account? &nbsp;
            <b onClick={signup}>Register</b>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Login;
