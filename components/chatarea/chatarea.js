import React, { useState, useEffect, useRef } from "react";
import Search from "../../public/assets/search";
import send from "../../public/assets/icons/send_message.svg";
import Spin from "../../public/assets/icons/loading_black.svg";
import closeIcon from "../../public/assets/icons/close_white.svg";
import { uuid } from "uuidv4";
import store from "../../store/store";
import { useProxy } from "valtio";
import firebase from "../../services/firebase";
import messages from "../../shared-data/contactdetails";

import TimeFormat from "../timeformat/timeformat";

const ChatArea = ({ closeChat, activeChat, user, convoReference }) => {
  const snapshot = useProxy(store);
  const chatRef = useRef();
  const imageRef = useRef();

  const [modal, setModal] = useState(false);
  const [loadedMessages, setMessage] = useState([]);
  const [state, setState] = useState({
    messagesRef: firebase.database().ref("messages"),
    storageRef: firebase.storage().ref(),
    messagesLoading: false,
    file: "",
    message: "",
    type: "",
    imageURL: "",
    metadata: {
      contentType: "image/jpeg",
    },
    errors: [],
  });

  const scrollBottom = () => {
    let objDiv = document.getElementById("messages");
    objDiv.scrollTop = objDiv.scrollHeight;
  };

  const viewImage = (content) => {
    store.slider = true;
    store.gallery = content;
  };

  const addMessageListener = () => {
    let chat = chatRef;
    let message = [];
    // console.log(convoReference);
    state.messagesRef.child(snapshot.activeConvo).on("child_added", (snap) => {
      message.push(snap.val());
      setMessage([...message]);
    });

    // console.log("message:", message);
  };

  const handleChange = (event) => {
    setState({
      ...state,
      message: event.target.value,
    });
  };

  const handleClick = () => {
    imageRef.current.click();
  };

  const handleImage = (event) => {
    let file = event.target.files[0];
    if (file) {
      setState({
        ...state,
        file: file,
      });
      setModal(!modal);
    }
  };

  const uploadImage = () => {
    setState({
      ...state,
      messagesLoading: true,
    });
    state.storageRef
      .child(`chat/public/${convoReference}/${uuid()}.jpg`)
      .put(state.file, state.metadata)
      .then((snap) => {
        snap.ref.getDownloadURL().then((downloadURL) => {
          setState({
            ...state,
            imageURL: downloadURL,
          });
          // updateAvatar(downloadURL)
          // updateUserList(downloadURL)
          // handleSubmit()
          sendImage(downloadURL);
        });
      })

      .catch((err) => {
        console.error(err);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("message", state.message, convoRef, user.displayName);
    sendMessage();
  };

  const closeModal = () => {
    setModal(false);
    setState({
      ...state,
      file: "",
    });
  };

  const createMessage = (data) => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: snapshot.user.uid,
        name: snapshot.user.displayName,
      },
      content: data,
      type: state.file === "" ? "text" : "image",
    };

    return message;
  };

  const sendImage = (data) => {
    state.messagesRef
      .child(snapshot.activeConvo)
      .push()
      .set(createMessage(data))
      .then(() => {
        setState({
          ...state,
          message: "",
          type: "",
          file: "",
          imageURL: "",
          errors: [],
          messagesLoading: false,
        });
        // console.log("sent");

        closeModal();
      })
      .catch((err) => {
        console.error(err);
        setState({ ...state, errors: state.errors.concat(err) });
      });
  };
  const sendMessage = () => {
    const { message, messagesRef } = state;

    if (message) {
      // this.setState({ loading: true });
      messagesRef
        .child(snapshot.activeConvo)
        .push()
        .set(createMessage(message))
        .then(() => {
          setState({ ...state, message: "", errors: [] });
          // console.log("sent");
          // closeModal()
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
    if (snapshot.activeConvo !== "") {
      addMessageListener();
    }
  }, [snapshot.activeConvo]);

  useEffect(() => {
    scrollBottom();
  }, [loadedMessages]);

  return (
    <div className="chat-area-container">
      {modal && (
        <div className="image-modal">
          <div onClick={closeModal} className="close">
            <img src={closeIcon} />
          </div>
          <img
            style={state.messagesLoading ? { opacity: 0.6 } : null}
            src={state.file != "" ? URL.createObjectURL(state.file) : null}
          />
          <button onClick={uploadImage}>
            {state.messagesLoading ? (
              <img className="loader" src={Spin} />
            ) : (
              "Send"
            )}
          </button>
        </div>
      )}
      {/* container for the messages */}
      <div className="chat-messages" id="messages" ref={chatRef}>
        {loadedMessages.map((msg, i) => {
          let day = new Date(msg.timestamp + 1000);

          return (
            <div key={i} className="message-holder">
              <div
                className={
                  msg.user.id === snapshot.user.uid
                    ? `message ${msg.type !== "text" && "image-msg"}`
                    : `message ${msg.type !== "text" && "image-msg"} recieve`
                }
              >
                {msg.type === "text" ? (
                  msg.content
                ) : (
                  <img
                    onClick={() => viewImage(msg.content)}
                    src={msg.content}
                  />
                )}

                <TimeFormat time={day} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="chat-area-type">
        <button onClick={handleClick}>
          <img
            src={require("../../public/assets/icons/upload-picture.svg")}
            height={30}
          />
        </button>
        <input
          ref={imageRef}
          type="file"
          onChange={handleImage}
          style={{ display: "none" }}
        />
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
    </div>
    // <div className="chat-area-container">
    //   {modal && (
    //     <div className="image-modal">
    //       <span onClick={closeModal}>&#10005;</span>
    //       <img
    //         style={state.messagesLoading ? {opacity: 0.6} : null}
    //         src={state.file != "" ? URL.createObjectURL(state.file) : null}
    //       />
    //       <button onClick={uploadImage}>
    //         {state.messagesLoading ? (
    //           <img
    //             className="loader"
    //             src={Spin}
    //           />
    //         ) : (
    //           "Send"
    //         )}
    //       </button>
    //     </div>
    //   )}
    //   {/* {
    //     state.view ? <div className="image-modal">
    //       <span onClick={setImageView("")}>&#10005;</span>
    //       <img
    //         src={imageView}
    //       />
    //       <h2>{imageView}</h2>
    //     </div>
    //     :
    //     null
    //   } */}
    //   <div className="chat-area-header">
    //     <div className="contact-details">
    //       <div className="contact-avatar">
    //         <div /*className={`status-ring ${msg.online ? null : "no-status"}`}*/
    //         >
    //           <button className="back-btn" onClick={closeChat}>
    //             <img
    //               src={require("../../public/assets/icons/left-arrow.svg")}
    //               height={20}
    //               width={20}
    //             />
    //           </button>
    //           {/* {activeChat.avatar != "" && (
    //             <img className="profile" src={activeChat.avatar} alt="avatar" />
    //           )} */}

    //           {activeChat.online ? (
    //             <p className="online-status">&bull;</p>
    //           ) : null}
    //         </div>
    //       </div>

    //       <p className="display-name">{activeChat.username}</p>
    //     </div>
    //     <div className="icons">
    //       <div className="search-icon">
    //         <Search color="#ffffff" />
    //       </div>
    //       <div className="dot-icon">
    //         <img src={require("../../public/assets/icons/dot_menu.svg")} />
    //       </div>
    //     </div>
    //   </div>

    //   {/* container for the messages */}
    //   {/* <div className="chat-messages" ref={chatRef}>
    //     {state.LoadedMessage.length != 0 && state.LoadedMessage.map((msg, i) => {
    //       let day = new Date(msg.timestamp + 1000);

    //       return (
    //         <div key={i} className="message-holder">
    //           <div
    //             className={
    //               msg.user.id === user.uid ? "message" : "message recieve"
    //             }
    //             onClick={setImageView(msg.content)}
    //           >
    //             {msg.type === "text" ? msg.content : <img  src={msg.content} />}
    //             {msg.message}
    //             <TimeFormat time={day} />
    //           </div>
    //         </div>
    //       );
    //     })}
    //   </div> */}

    //   {activeChat.username != "" && (
    //     <div className="chat-area-type">
    //       <button onClick={handleClick}>
    //         <img
    //           src={require("../../public/assets/icons/upload-picture.svg")}
    //           height={30}
    //         />
    //       </button>
    //       <input
    //         ref={imageRef}
    //         type="file"
    //         onChange={handleImage}
    //         style={{ display: "none" }}
    //       />
    //       <form onSubmit={handleSubmit} autoComplete="off">
    //         <input
    //           type="text"
    //           name="message"
    //           value={state.message}
    //           onChange={handleChange}
    //           placeholder="Type a message"
    //         />
    //         {/* <span className="input" contentEditable={true} value={message} onChange={handleChange}
    //         ></span> */}

    //         <button className="send-btn" disabled={state.message === ""}>
    //           <img src={send} />
    //         </button>
    //       </form>
    //     </div>
    //   )}
    // </div>
  );
};

export default ChatArea;
