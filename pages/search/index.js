import React, { useState, useEffect } from "react";
import firebase from "../../services/firebase";
import { useRouter } from "next/router";
import Link from "next/link";

const Index = () => {
  const [user, setUser] = useState();
  const router = useRouter();
  const [state, setState] = useState({
    loading: false,
    convoRef: "",
    error: "",
  });
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [usersRef, setUsersRef] = useState();

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const searchUsers = (event) => {
    event.preventDefault()
    setState({ ...state, loading: true, error: "" });
    let loadedUsers = [];
    usersRef.on("child_added", (snap) => {
      
      if (user.uid != snap.val().id) {
        loadedUsers.push(snap.val());
        setUsers(
          loadedUsers.filter((users) => {
            return users.name.toLowerCase() === search.toLowerCase();
          })
        );
      }
      
    })
    // if (users.length < 1) {
    //   console.log("damn");
    //   setState({
    //       ...state,
    //       error: "No user with this Username Exists"
    //     })
    // }
    // .then(() => {
    //   if(users.length < 1){
    //     setState({
    //       ...state,
    //       error: "No user with this Username Exists"
    //     })
    //   }
    // });
    // console.log("users", users);
    setState({ ...state, loading: false });
  };

  const addConversation = (party) => {
    const currentUser = firebase.auth().currentUser;
    const key = currentUser.uid + "-" + party.id;
    // console.log(key);

    const newConvo = {
      id: key,
      participants: [
        {
          id: party.id,
          name: party.name,
          avatar: party.avatar,
        },
        {
          id: currentUser.uid,
          name: currentUser.displayName,
          avatar: currentUser.photoURL,
        },
      ],
    };

    state.convoRef
      .child(key)
      .update(newConvo)
      .then(() => {
        console.log("convo added");
        router.push("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const ErrorMsg = () => {
    return (
      <div>
        <h4>Enter a Username to search</h4>
      </div>
    );
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setState({
          ...state,
          convoRef: firebase.database().ref("conversations"),
        });
        setUsersRef(firebase.database().ref("users"));
      } else {
        router.push("/login");
      }
    });
  }, []);

  return (
    <div className="search-area">
      <Link href="/">
        <span className="close">[X]Close</span>
      </Link>
      <div className="search-input">
        <form onSubmit={searchUsers}>
        <input
          type="text"
          placeholder="Search or start a new chat"
          value={search}
          onChange={handleChange}
        />
        <button disabled={state.loading}>
          {state.loading ? (
            <img
              className="loader"
              src={require("../../public/assets/icons/loading_black.svg")}
            />
          ) : (
            "Search"
          )}
        </button>
        </form>
        
      </div>
      <div className="search-result">
        {search != ""
          ? users.map((user, i) => (
              <div key={i} className="search-item">
                <div className="user-details">
                  <div className="contact-avatar">
                    <div className={`status-ring no-status`}>
                      <img src={user.avatar} alt="avatar" />
                    </div>
                  </div>
                </div>
                <p>{user.name}</p>
                <button
                  style={{ marginLeft: "auto" }}
                  onClick={() => addConversation(user)}
                >
                  Start chat
                </button>
              </div>
            ))
          : ErrorMsg()}
          
            <h4 className="error">{state.error}</h4>
          
      </div>
    </div>
  );
};

export default Index;
