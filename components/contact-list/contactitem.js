import React, { useEffect, useState } from "react";
import messages from "../../shared-data/contactdetails";
import firebase from "../../services/firebase";

const ContactItem = ({ setChatMode, setActiveChat, conversation, user }) => {
  const date = new Date();
  const username = "Venaz";
  const [state, setState] = useState({
    messagesRef: firebase.database().ref("messages"),
  })
  const [convo, setConvo] = useState(null);

  const handleClick = (convo) => {
    setChatMode();
    setActiveChat(getUsername(convo.participants), convo.id, getAvatar(convo.participants));  
    // console.log(convo.id);
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
      });
      
    return new Promise ( resolve => {
      setTimeout(() => {
        resolve(loadedConversations)

      }, 2000)
    })
    
  
  }

  async function asyncCall(user) {
    // console.log("calling");
    const result = await addConvoListener(user)
    // console.log("result", result);
    setConvo(result)
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

  const getAvatar = (details) => {
    let avatar
    details.map((det) => {
      if (det.id !== user.uid) {
        avatar = det.avatar;
      }
    });
    return avatar
  }

  

  useEffect(() => {
    asyncCall(user)

  }, []);

  return convo ? (
    convo.map((msg, i) => {
      // let length
      // let messages = []
      // state.messagesRef.child(msg.id).once("value", (snap) => {
      //   console.log(`there are ${snap.numChildren()} messages`)
      //   length = snap.numChildren()
      // }); 
      // state.messagesRef.child(msg.id).on("child_added", (snap) => {
      //   messages.push(snap.val())
      //   if(messages.length > length){
      //   console.log(`new message from ${getUsername(msg.participants)}`)
      //   }
      // }); 
      return(
      <div key={i} className="contact-item" onClick={() => handleClick(msg)}>
        <div className="contact-avatar">
          <div className={`status-ring ${msg.online ? null : "no-status"}`}>
            <img
              src={getAvatar(msg.participants)}
              alt="avatar"
            />
          </div>

          {msg.online ? <p className="online-status">&bull;</p> : null}
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
    )})
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
