import React, { useState, useEffect, useRef } from "react";
import Search from "../../public/assets/search";
import { Dropdown } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";
import store from "../../store/store";
import { useProxy } from "valtio";

const SearchBar = ({ signOut }) => {
  const router = useRouter();
  const snapshot = useProxy(store);
  const [drop, setDrop] = useState(false);
  const conmponentRef = useRef()
  const dropdownOptions = () => [
    {
      key: "signout",
      text: (
        <div className="dropdown">
          <span onClick={signOut}>Sign Out</span>
        </div>
      ),
    },
  ];

  const handleClickOutside = (event) => {
    if (
      conmponentRef.current &&
      !conmponentRef.current.contains(event.target)
    ) {
      setDrop(false);
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="search-bar-holder">
      <div className="user-details">
        <div className="contact-avatar" onClick={() => setDrop(!drop)}>
          <div className={`status-ring no-status`}>
            <img
              src={
                snapshot.user?.photoURL
                  ? snapshot.user?.photoURL
                  : require("../../public/assets/new_profile.png")
              }
              alt="avatar"
            />
          </div>

          <p className="online-status">&bull;</p>
        </div>
        <p>{snapshot.user.displayName}</p>
      </div>

      <Link href="/search">
        <div className="search">
          <img src={require("../../public/assets/icons/add-chat.svg")} />
          {/* <input type="text" placeholder="Search or start a new chat" /> */}
        </div>
      </Link>

      {drop ? (
        <div className="dropdown" ref={conmponentRef}>
          <Link href="/profile">
            <div>Profile</div>
          </Link>
          <div onClick={signOut}>Sign Out</div>
        </div>
      ) : null}

      {/* <Dropdown
        trigger={
          <div>
            <img src={require("../../public/assets/icons/dot_menu.svg")} />
          </div>
        }
        // options={dropdownOptions()}
      /> */}
    </div>
  );
};
export default SearchBar;
