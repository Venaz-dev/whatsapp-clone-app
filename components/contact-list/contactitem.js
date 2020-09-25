import React from "react";
import messages from "../../shared-data/contactdetails";

const ContactItem = ({setChatMode, setActiveChat}) => {
  const date = new Date();
  const username = "Venaz";

  const handleClick = (msg) => {
    setChatMode()
    setActiveChat(msg)
    console.log(msg)

  }

  return messages.map((msg) => (
    <div className="contact-item" onClick={() => handleClick(msg)}>
      <div className="contact-avatar">
        <div className={`status-ring ${msg.online ? null : "no-status"}`}>
          <img
            src={require("../../public/assets/review_02.png")}
            alt="avatar"
          />
        </div>

        {msg.online ? <p className="online-status">&bull;</p> : null}
      </div>
      <div className="contact-name">
        <p className="display-name">{msg.username}</p>
        <p className="last-message">
        
          {msg.sender === username ? <>&#x2713; &nbsp;</> : null}
          {msg.message}
        </p>
      </div>
      <div className="date">
        <p className="last-message-date">{msg.time}</p>
      </div>
    </div>
  ));
};

export default ContactItem;
