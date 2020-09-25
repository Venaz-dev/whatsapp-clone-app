import React, { useState, useRef, useEffect } from "react";
import ContactItem from "./contactitem";
import SearchBar from "./searchbar";
import ChatArea from "../chatarea/chatarea";
import useDeviceDetect from "../../services/useDeviceDetect";

const ContactList = ({ children, closeChat }) => {
  const { isMobile } = useDeviceDetect();
  const chatareaRef = useRef();
  const contactRef = useRef();

  const [chatMode, setChatMode] = useState(false);

  const [activeChat, setActiveChat] = useState({
    username: "",
    status: "",
  });

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
        <div className="searchbar-holder">
          <SearchBar />
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
