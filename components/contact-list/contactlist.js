import React, { useState, useRef, useEffect } from "react";
import ContactItem from "./contactitem";
import SearchBar from "./searchbar";
import ChatArea from "../chatarea/chatarea";
import useDeviceDetect from "../../services/useDeviceDetect";

import firebase from "../../services/firebase";

export default function ContactList ({ children, closeChat, setLoading, currentUser, convo }) {
  const { isMobile } = useDeviceDetect();
  const chatareaRef = useRef();
  const contactRef = useRef();

  const [chatMode, setChatMode] = useState(false);
  const [user, setUser] = useState(currentUser);
  const [conversation, setConvo] = useState([])
  const [activeChat, setActiveChat] = useState({
    username: "",
    status: "",
    convoRef: "",
    avatar: ""
  });
  

  const updateConvo = () =>{

  }
  
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
      avatar: avatar
      // online: value.online,
      // message: value.message,
      // sender: value.sender,
    });
  };

  

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

  

  return  (
    <div className="contact-list-container">
      <div className="contact-list" ref={contactRef}>
        
        <div className="searchbar-holder">
          {}
          <SearchBar signOut={signOut} user={user} />
        </div>

        <ContactItem
          setChatMode={() => setChatMode(true)}
          setActiveChat={setChat}
          // convo={addConvoListener()}
          // conversation={conversation}
          user={user}
        />
      </div>

      <div className="content" ref={chatareaRef}>
        {/* {children} */}
        <ChatArea
          closeChat={() => setChatMode(false)}
          activeChat={activeChat}
          user={user}
          convoReference={activeChat.convoRef}
        />
      </div>
    </div>
  );
};



// export default ContactList;

