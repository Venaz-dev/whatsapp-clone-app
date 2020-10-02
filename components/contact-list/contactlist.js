import React, { useState, useRef, useEffect } from "react";
import ContactItem from "./contactitem";
import SearchBar from "./searchbar";
import ChatArea from "../chatarea/chatarea";
import useDeviceDetect from "../../services/useDeviceDetect";

import firebase from "../../services/firebase";

export default function ContactList ({ children, closeChat, setLoading, currentUser }) {
  const { isMobile } = useDeviceDetect();
  const chatareaRef = useRef();
  const contactRef = useRef();

  const [chatMode, setChatMode] = useState(false);
  const [user, setUser] = useState(currentUser);
  const [convo, setConvo] = useState()

  const [activeChat, setActiveChat] = useState({
    username: "",
    status: "",
  });

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("signed out!");
        setLoading();
      });
  };

  const setChat = (value) => {
    setActiveChat({
      username: value.username,
      online: value.online,
      message: value.message,
      sender: value.sender,
    });
  };

  const addConvoListener = () => {
    
    let loadedConversations = [];
    firebase.database().ref("conversations").on("child_added", snap => {
      snap.val().participants.map( (part) => {
        // if(part.id === user.uid){
        //   // loadedConversations.push(snap.val());
        //   console.log("yello", snap.val())
        //   // setConvo(loadedConversations)
        // }
        
      })
      // console.log(snap.val())
      
    });
    console.log(currentUser);
    // console.log("convo", loadedConversations)
    // console.log("convostate", convo)
    
    
  }

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
    addConvoListener()
    
    
  }, [chatMode]);

  return (
    <div className="contact-list-container">
      <div className="contact-list" ref={contactRef}>
        
        <div className="searchbar-holder">
          <SearchBar signOut={signOut} user={user} />
        </div>

        <ContactItem
          setChatMode={() => setChatMode(true)}
          setActiveChat={setChat}
          convo={convo}
          user={user}
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



// export default ContactList;

