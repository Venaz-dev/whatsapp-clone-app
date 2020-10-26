import React, { useState, useEffect } from "react";
import firebase from "../../services/firebase";
import { useRouter } from "next/router";
import Link from 'next/link'

const Index = (user) => {
  const router = useRouter();
  const [state, setState] = useState({
    loading: false,
    convoRef: '',
  });
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [usersRef, setUsersRef] = useState();

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const searchUsers = () => {
    // let loadedChannels = [];
    // this.state.channelsRef.on("child_added", snap => {
    //   loadedChannels.push(snap.val());
    //   this.setState({ channels: loadedChannels }, () => this.setFirstChannel());
    // });
    setState({ ...state, loading: true });
    let loadedUsers = [];
    usersRef.on("child_added", (snap) => {
      loadedUsers.push(snap.val());
      setUsers(
        loadedUsers.filter((user) => {
          return user.name.toLowerCase() === search.toLowerCase();
        })
      );
    });
    // setUsers(users.filter( (user) => { return user.name.toLowerCase() === search.toLowerCase()}))
    console.log("users", users);
    setState({ ...state, loading: false });
  };

  const addConversation = (party) => {
    // addChannel = () => {
    //   const { channelsRef, channelName, channelDetails, user } = this.state;

    //   const key = channelsRef.push().key;

    //   const newChannel = {
    //     id: key,
    //     name: channelName,
    //     details: channelDetails,
    //     createdBy: {
    //       name: user.displayName,
    //       avatar: user.photoURL
    //     }
    //   };

    //   channelsRef
    //     .child(key)
    //     .update(newChannel)
    //     .then(() => {
    //       this.setState({ channelName: "", channelDetails: "" });
    //       this.closeModal();
    //       console.log("channel added");
    //     })
    //     .catch(err => {
    //       console.error(err);
    //     });
    // };
    const currentUser = firebase.auth().currentUser;
    const key = currentUser.uid + "-" + party.id;
    console.log(key);

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
          .then(() => console.log('convo added'))
          .catch(err => {
            console.error(err)
          })
  };

  useEffect(() => {

    setState({ ...state, convoRef: firebase.database().ref("conversations")})
    setUsersRef(firebase.database().ref("users"))

  }, [])

  return (
    <div className="search-area">
      <Link href="/">
      <span
        className="close"
      >
        [X]Close
      </span>
      </Link>
      <div className="search-input">
        <input
          type="text"
          placeholder="Search or start a new chat"
          value={search}
          onChange={handleChange}
        />
        <button onClick={searchUsers} disabled={state.loading}>
          {state.loading ? (
            <img
              className="loader"
              src={require("../../public/assets/icons/loading_black.svg")}
            />
          ) : (
            "Search"
          )}
        </button>
      </div>
      <div className="search-result">
        {users.length > 0 ? (
          users.map((user, i) => (
            <div key={i} className="search-item">
              <div className="user-details">
                <div className="contact-avatar">
                  <div className={`status-ring no-status`}>
                    <img src={user.avatar} alt="avatar" />
                  </div>
                </div>
              </div>
              <p>{user.name}</p>
              <button onClick={() => addConversation(user)}>Start chat</button>
            </div>
          ))
        ) : (
          <h4> No users with this Username</h4>
        )}
      </div>
    </div>
  );
};

export default Index;
