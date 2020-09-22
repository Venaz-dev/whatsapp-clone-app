import React from 'react'
import Search from "../../public/assets/search"

const SearchBar = () => {
    return (
        <div className="search-bar-holder">
            <div className="search">
                <Search color="#6E6E6E" />
                <input 
                    type="text"
                    placeholder="Search or start a new chat"

                />
            </div>
        </div>
    )
}
export default SearchBar
