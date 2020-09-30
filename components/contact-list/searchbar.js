import React, { useState } from "react";
import Search from "../../public/assets/search";
import { Dropdown } from "semantic-ui-react";

const SearchBar = ({ signOut }) => {
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
      <div className="search">
        <Search color="#6E6E6E" />
        <input type="text" placeholder="Search or start a new chat" />
      </div>
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
