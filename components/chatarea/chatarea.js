import React, { useState } from "react";
import Search from "../../public/assets/search";
import send from "../../public/assets/icons/send_message.svg";

const ChatArea = ({ closeChat, activeChat }) => {
  const username = "Venaz";
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className="chat-area-container">
      <div className="chat-area-header">
        <div className="contact-details">
          <div className="contact-avatar">
            <div /*className={`status-ring ${msg.online ? null : "no-status"}`}*/
            >
              <button className="back-btn" onClick={closeChat}>
                <img
                  src={require("../../public/assets/icons/left-arrow.svg")}
                  height={20}
                  width={20}
                />
              </button>
              <img
                src={require("../../public/assets/review_02.png")}
                alt="avatar"
              />
              {activeChat.online ? (
                <p className="online-status">&bull;</p>
              ) : null}
            </div>
          </div>

          <p className="display-name">{activeChat.username}</p>
        </div>
        <div className="icons">
          <div className="search-icon">
            <Search color="#ffffff" />
          </div>
          <div className="dot-icon">
            <img src={require("../../public/assets/icons/dot_menu.svg")} />
          </div>
        </div>
      </div>
      
      {/* container for the messages */}
      <div className="chat-messages">
              <p className={activeChat.sender === username ? "message sent" : "message recieve"}>{activeChat.message}</p>
      </div>

      <div className="chat-area-type">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="message"
            value={message}
            onChange={handleChange}
            placeholder="Type a message"
          />
          {/* <span className="input" contentEditable={true} value={message} onChange={handleChange}
        ></span> */}

          <button
            className="send-btn"
            onClick={() => console.log("hello")}
            disabled={message === ""}
          >
            <img src={send} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;
