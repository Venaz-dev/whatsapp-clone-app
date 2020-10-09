import React, { useEffect, useState } from "react";
import messages from "../../shared-data/contactdetails";
import firebase from "../../services/firebase";

const ContactItem = ({ setChatMode, setActiveChat, conversation, user }) => {
  const date = new Date();
  const username = "Venaz";

  const [convo, setConvo] = useState();

  const handleClick = (msg) => {
    setChatMode();
    setActiveChat(msg);
    console.log(msg);
  };

  function addConvoListener(user) {
    let loadedConversations = [];
    firebase
      .database()
      .ref("conversations")
      .on("child_added", (snap) => {
        snap.val().participants.map((part) => {
          if (part.id === user.uid) {
            loadedConversations.push(snap.val());
          }
        });
        // console.log(snap.val())
      });

    return loadedConversations;
  }

  const getUsername = (details) => {
    let username = "";
    details.map((det) => {
      if (det.id !== user.uid) {
        username = det.name;
      }
    });
    return username;
  };

  useEffect(() => {
    setConvo(addConvoListener(user));
  }, [convo]);

  return convo ? (
    messages.map((msg, i) => (
      <div key={i} className="contact-item" onClick={() => handleClick(msg)}>
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
          <p className="display-name">{getUsername(msg.participants)}</p>
          <p className="last-message">
            {msg.sender === username ? <>&#x2713; &nbsp;</> : null}
            {msg.message}
          </p>
        </div>
        <div className="date">
          {/* <p className="last-message-date">{msg.time}</p> */}
        </div>
      </div>
    ))
  ) : (
    <div className="contact-item">
      <div className="contact-loading">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default ContactItem;
