import React, { useState, useRef, useEffect } from "react";
import ContactItem from "./contactitem";
import SearchBar from "./searchbar";
import ChatArea from "../chatarea/chatarea";
import useDeviceDetect from "../../services/useDeviceDetect";
import store from "../../store/store";
import { useProxy } from "valtio";

import firebase from "../../services/firebase";

export default function ContactList({
  children,
  closeChat,
  setLoading,
  currentUser,
  convo,
}) {
  const snapshot = useProxy(store);
  const { isMobile } = useDeviceDetect();
  const chatareaRef = useRef();
  const contactRef = useRef();
  const [messages, setMessages] = useState([]);
  const [chatMode, setChatMode] = useState(false);
  const [user, setUser] = useState(currentUser);
  const [conversation, setConvo] = useState([]);
  const [activeChat, setActiveChat] = useState({
    username: "",
    status: "",
    convoRef: "",
    avatar: "",
    messagesRef: firebase.database().ref("messages"),
  });

  const addConvoListener = () => {
    let loadedConversations = [];
    let user = snapshot.user;
    firebase
      .database()
      .ref("conversations")
      .on("child_added", (snap) => {
        
        snap.val().participants.map((part) => {
          if (part.id === user.uid) {
            console.log(snap.val());
            loadedConversations.push(snap.val());
            setConvo([...loadedConversations]);
          }
        });
      });

        store.loading = false

    

    
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("signed out!");
        setLoading();
      });
    // console.log("sign out");
  };

  const setChat = (value, convoRef, avatar) => {
    // console.log("ref", convoRef);
    setActiveChat({
      username: value,
      convoRef: convoRef,
      avatar: avatar,
      // online: value.online,
      // message: value.message,
      // sender: value.sender,
    });
    console.log("ref", convoRef);
  };

  const getMessages = () => {
    let loadedMessages = [];
    activeChat.messagesRef
      .child(activeChat.convoRef)
      .on("child_added", (snap) => {
        loadedMessages.push(snap.val());
        console.log("exec", loadedMessages);
      });
    return loadedMessages;
  };

  const getAvatar = (details) => {
    let avatar;
    details.map((det) => {
      if (det.id !== snapshot.user.uid) {
        avatar = det.avatar;
      }
    });
    return avatar;
  };
  const getUsername = (details) => {
    let username = "";
    details.map((det) => {
      if (det.id !== snapshot.user.uid) {
        username = det.name;
      }
    });
    return username;
  };

  const setActiveConvo = (id) =>{
    store.activeConvo = id
  }

  useEffect(() => {
    if (isMobile) {
      if (chatMode) {
        chatareaRef.current.style.transform = "translateX(0)";
        contactRef.current.style.opacity = "0";
        // console.log(children);
      } else {
        chatareaRef.current.style.transform = "translateX(100vw)";
        contactRef.current.style.opacity = "1";
      }
    }
    setTimeout(() => {
      // addConvoListener()
    }, 1000);

    // setConvo(convo)
  }, [chatMode]);

  useEffect(() => {
    addConvoListener();
  }, []);

  

  return (
    <div className="contact-list-container">
      <div className="searchbar-holder">
          <SearchBar signOut={signOut} />
        </div>
      <div className="contact-list" ref={contactRef}>
        {conversation.map((msg) => (
          <div
            key={msg.id}
            className={`contact-item ${
              snapshot.activeConvo === msg.id && "active"
            }`}
            onClick={() => setActiveConvo(msg.id)}
          >
            <div className="contact-avatar">
              <div className={`status-ring no-status`}>
                <img src={getAvatar(msg.participants)} alt="avatar" />
              </div>

              <p className="online-status">&bull;</p>
            </div>
            <div className="contact-name">
              <p className="display-name">{getUsername(msg.participants)}</p>
              {/* <p className="last-message">
              {msg.sender === username ? <>&#x2713; &nbsp;</> : null}
              {msg.message}
            </p> */}
            </div>
            <div className="date">
              {/* <p className="last-message-date">{msg.time}</p> */}
            </div>
          </div>
        ))}

        {/* <div className="searchbar-holder">
          {}
          <SearchBar signOut={signOut} user={user} />
        </div> */}

        {/* <ContactItem
          // setChatMode={() => setChatMode(true)}
          // setActiveChat={setChat}
          // convo={addConvoListener()}
          // conversation={conversation}
          // user={user}
        /> */}
      </div>
      {/* <div className="content" ref={chatareaRef}> */}
      {/* {children} */}
      {/* <ChatArea
          closeChat={() => setChatMode(false)}
          activeChat={activeChat}
          user={user}
          convoReference={activeChat.convoRef}
        />
      </div> */}
    </div>
  );
}

// export default ContactList;
