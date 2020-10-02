import React, { useState } from "react";
import Search from "../../public/assets/search";
import { Dropdown } from "semantic-ui-react";
import { useRouter } from 'next/router'
import Link from "next/link"

const SearchBar = ({ signOut, user }) => {
    const router = useRouter()
  const [drop, setDrop] = useState(false);
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
  return (
    <div className="search-bar-holder">
        <div className="user-details">
          <div className="contact-avatar">
            <div className={`status-ring no-status`}>
              <img src={user && user.photoURL} alt="avatar" />
            </div>

            <p className="online-status">&bull;</p>
          </div>
          <p>{user && user.displayName}</p>
        </div>
        
      <Link href="/search">
      <div className="search">
      <Search color="#ffffff" />
        {/* <input type="text" placeholder="Search or start a new chat" /> */}
      </div>
      </Link>
      <div onClick={() => setDrop(!drop)}>
        <img src={require("../../public/assets/icons/dot_menu.svg")} />
      </div>
      {drop ? (
        <div className="dropdown">
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
