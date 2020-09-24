import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {useState} from "react"
import ContactList from "../components/contact-list/contactlist"
import ChatArea from "../components/chatarea/chatarea"


export default function Home() {
 
  const [chatModeBack, setChatModeBack] = useState(false);
  return (

    <div className="app-container">
      <ContactList closeChat ={chatModeBack} >
        {/* <ChatArea closeChat={() => setChatModeBack(true)}/> */}
      </ContactList>
      
    </div>
  )
}
