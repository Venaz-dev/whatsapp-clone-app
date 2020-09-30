import React, { useState, useRef, useEffect } from "react";
import ContactItem from "./contactitem";
import SearchBar from "./searchbar";
import ChatArea from "../chatarea/chatarea";
import useDeviceDetect from "../../services/useDeviceDetect";

import firebase from "../../services/firebase"

const ContactList = ({ children, closeChat, setLoading }) => {
  const { isMobile } = useDeviceDetect();
  const chatareaRef = useRef();
  const contactRef = useRef();

  const [chatMode, setChatMode] = useState(false);
  const [user, setUser] = useState(firebase.auth().currentUser)

  const [activeChat, setActiveChat] = useState({
    username: "",
    status: "",
  });

  const signOut = () =>{
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("signed out!")
        setLoading()
      });
  }

  const setChat = (value) => {
    setActiveChat({
      username: value.username,
      online: value.online,
      message: value.message,
      sender: value.sender,
    });
  };

  useEffect(() => {
    if (isMobile) {
      if (chatMode) {
        chatareaRef.current.style.transform = "translateX(0)";
        contactRef.current.style.opacity = "0";
        console.log(children);
      } else {
        chatareaRef.current.style.transform = "translateX(100vw)";
        contactRef.current.style.opacity = "1";
      }
    }
  }, [chatMode]);

  return (
    <div className="contact-list-container">
      <div className="contact-list" ref={contactRef}>
        <div className="user-details">
        <div className="contact-avatar">
        <div className={`status-ring no-status`}>
          <img
            src={user.photoURL}
            alt="avatar"
          />
        </div>

        <p className="online-status">&bull;</p>
      </div>
        <p>{user.displayName}</p>
        </div>
        <div className="searchbar-holder">
          <SearchBar signOut={signOut}/>
        </div>

        <ContactItem
          setChatMode={() => setChatMode(true)}
          setActiveChat={setChat}
        />
      </div>

      <div className="content" ref={chatareaRef}>
        {/* {children} */}
        <ChatArea
          closeChat={() => setChatMode(false)}
          activeChat={activeChat}
        />
      </div>
    </div>
  );
};

export default ContactList;
