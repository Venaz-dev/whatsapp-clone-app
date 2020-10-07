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
      
  };

  const setChat = (value) => {
    setActiveChat({
      username: value.username,
      online: value.online,
      message: value.message,
      sender: value.sender,
    });
  };

  // function addConvoListener() {
    
  //   let loadedConversations = [];
  //   firebase.database().ref("conversations").on("child_added", snap => {
  //     snap.val().participants.map( (part) => {
  //       if(part.id === user.uid){
  //         loadedConversations.push(snap.val());
          
  //       }
        
  //     })
  //     // console.log(snap.val())
      
  //   });

  //   convo = loadedConversations
  //   setConversation(loadedConversations)
  //   return convo
    
  // }

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
    setTimeout(() => {
      // addConvoListener()
    }, 1000);
    
    setConvo(convo)
    
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
        />
      </div>
    </div>
  );
};



// export default ContactList;

