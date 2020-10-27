import React, { useState, useEffect, useRef } from "react";
import Search from "../../public/assets/search";
import send from "../../public/assets/icons/send_message.svg";

import firebase from "../../services/firebase";
import messages from "../../shared-data/contactdetails";

import TimeFormat from "../timeformat/timeformat";

const ChatArea = ({ closeChat, activeChat, user, convoReference }) => {
  const chatRef = useRef();
  const [messages, setMessage] = useState([]);
  const [state, setState] = useState({
    messagesRef: firebase.database().ref("messages"),
    messagesLoading: true,
    message: "",
    errors: [],
  });
  const username = "Venaz";

  const scrollBottom = () => {
    let chatDiv = chatRef.current;
    chatDiv.scrollTop = chatDiv.scrollHeight;
  };

  const addMessageListener = (convoReference) => {
    let loadedMessages = [];
    state.messagesRef.child(convoReference).on("child_added", (snap) => {
      loadedMessages.push(snap.val());
    });

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(loadedMessages);
      }, 500);
    });
  };

  async function getMessages() {
    // console.log("calling");
    state.messagesRef.child(convoReference).on("child_added", async () => {
    const result = await addMessageListener(convoReference);
    setMessage(result);
    scrollBottom()
    })
    // console.log("result", result);
    scrollBottom();
  }

  const handleChange = (event) => {
    setState({
      ...state,
      message: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("message", state.message, convoRef, user.displayName);
    sendMessage();
  };

  const createMessage = () => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: user.uid,
        name: user.displayName,
        avatar: user.photoURL,
      },
      message: state.message,
    };
    return message;
  };
  const sendMessage = () => {
    const { message, messagesRef } = state;

    if (message) {
      // this.setState({ loading: true });
      messagesRef
        .child(convoReference)
        .push()
        .set(createMessage())
        .then(() => {
          setState({ ...state, message: "", errors: [] });
          // console.log("sent");
          scrollBottom();
        })
        .catch((err) => {
          console.error(err);
          setState({ ...state, errors: state.errors.concat(err) });
        });
    } else {
      setState({
        ...state,
        errors: state.errors.concat({ message: "Add a message" }),
      });
    }
  };

  useEffect(() => {
    if (convoReference) {
      setMessage([]);
      getMessages();
      setState({
        ...state,
        message: "",
      });
    }
  }, [convoReference]);
  return (
    <div className="chat-area-container">
      <div className="chat-area-header">
        <div className="contact-details">
          <div className="contact-avatar">
            <div /*className={`status-ring ${msg.online ? null : "no-status"}`}*/
            >
              <button className="back-btn" onClick={closeChat}>
                <img
                  src={require("../../public/assets/icons/left-arrow.svg")}
                  height={20}
                  width={20}
                />
              </button>
              {activeChat.avatar != "" && (
                <img src={activeChat.avatar} alt="avatar" />
              )}

              {activeChat.online ? (
                <p className="online-status">&bull;</p>
              ) : null}
            </div>
          </div>

          <p className="display-name">{activeChat.username}</p>
        </div>
        <div className="icons">
          <div className="search-icon">
            <Search color="#ffffff" />
          </div>
          <div className="dot-icon">
            <img src={require("../../public/assets/icons/dot_menu.svg")} />
          </div>
        </div>
      </div>

      {/* container for the messages */}
      <div className="chat-messages" ref={chatRef}>
        {messages.map((msg, i) => {
          let day = new Date(msg.timestamp + 1000);

          return (
            <div key={i} className="message-holder">
              <div
                className={
                  msg.user.id === user.uid ? "message" : "message recieve"
                }
              >
                {msg.message}
                <TimeFormat time={day} />
              </div>
            </div>
          );
        })}
      </div>

      {activeChat.username != "" && (
        <div className="chat-area-type">
          <form onSubmit={handleSubmit} autoComplete="off">
            <input
              type="text"
              name="message"
              value={state.message}
              onChange={handleChange}
              placeholder="Type a message"
            />
            {/* <span className="input" contentEditable={true} value={message} onChange={handleChange}
        ></span> */}

            <button className="send-btn" disabled={state.message === ""}>
              <img src={send} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatArea;
