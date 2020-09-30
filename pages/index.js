import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {useState, useEffect} from "react"
import ContactList from "../components/contact-list/contactlist"
import ChatArea from "../components/chatarea/chatarea"

import firebase from "../services/firebase"
import { useRouter } from 'next/router'
import Spinner from "../components/spinner/spinner"


export default function Home() {

  const router = useRouter();

  const [currentUser, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [chatModeBack, setChatModeBack] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log(user);
          setUser(user)
          setLoading(false)
          // router.push('/')
          // handleSignout()
        //   this.props.setUser(user);
        //   this.props.history.push("/");
        } else {
          router.push('/login')
        //   this.props.history.push("/login");
        //   this.props.clearUser();
        }
      });
    // if (user) {
    //   router.push('/')
    // }
  }, []);
  return loading ? (<Spinner />)
  :
  (
    
    <div className="app-container">
      <ContactList closeChat ={chatModeBack} setLoading={() => setLoading(!loading)}>
        {/* <ChatArea closeChat={() => setChatModeBack(true)}/> */}
      </ContactList>
      
    </div>
  )
}
