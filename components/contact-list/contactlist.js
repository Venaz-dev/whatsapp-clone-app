import React from 'react'
import ContactItem from "./contactitem"
import SearchBar from "./searchbar"

const ContactList = () => {
    return (
        <div className="contact-list-container">
            <SearchBar />
            <ContactItem />
        </div>
    )
}

export default ContactList
