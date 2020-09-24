import React, { useState, useRef, useEffect } from "react";
import ContactItem from "./contactitem";
import SearchBar from "./searchbar";
import ChatArea from "../chatarea/chatarea"

const ContactList = ({ children, closeChat }) => {
  const chatareaRef = useRef();
  const contactRef = useRef()

  const [chatMode, setChatMode] = useState(false);
  
  useEffect(() => {
    if (chatMode) {
      chatareaRef.current.style.transform = "translateX(0)";
      contactRef.current.style.opacity = '0';
      console.log(children)
    }else{
        chatareaRef.current.style.transform = "translateX(100vw)";
        contactRef.current.style.opacity = '1';
    }
  }, [chatMode]);

  return (
    <div className="contact-list-container">
      <div className="contact-list" ref={contactRef}>
        <div className="searchbar-holder">
          <SearchBar />
        </div>

        <ContactItem setChatMode={() => setChatMode(true)} />
      </div>

      <div className="content" ref={chatareaRef}>
        {/* {children} */}
        <ChatArea closeChat={() => setChatMode(false)}/>
      </div>
    </div>
  );
};

export default ContactList;
