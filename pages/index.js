import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {useState, useEffect} from "react"
import ContactList from "../components/contact-list/contactlist"
import ChatArea from "../components/chatarea/chatarea"

import firebase from "../services/firebase"
import { useRouter } from 'next/router'
import Spinner from "../components/spinner/spinner"


export default function Home({ data }) {
  let loadedConversations = [];
  const router = useRouter();
  const [state, setState] = useState({
    // convoRef: firebase.database().ref("conversations"),
  })
  
  const [currentUser, setCurrentUser] = useState({displayName: 'howdy'})
  const [load, setLoad] = useState(true)
  const [chatModeBack, setChatModeBack] = useState(false);
  const [conversation, setConversation] = useState([])
  function offLoader() {
    setLoad(false)
  }

  function addConvoListener(user) {
    
    
    firebase.database().ref("conversations").on("child_added", snap => {
      snap.val().participants.map( (part) => {
        if(part.id === user.uid){
          loadedConversations.push(snap.val());
          setConversation(loadedConversations)
        }
        
      })
      // console.log(snap.val())
      // loadedConversations.push(snap.val());
      

      // loadedConversations = snap.val()
      console.log("hmmm",loadedConversations);
      console.log("setjjj", conversation)
      
    })

    // convo = loadedConversations
    
    
    // console.log(loadedConversations);
    
  }
  const setConvo = () => {
    setConversation(loadedConversations)
  }
  

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
          
          setCurrentUser(user)
          addConvoListener(user)
          console.log("user", currentUser);
          setLoad(false)
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
  }, [load]);
  return load ? (<Spinner />)
  :
  (
    
    <div className="app-container">
      {/* {conversation[0].participants[0].name} */}
      <ContactList currentUser={currentUser} closeChat={chatModeBack} setLoading={() => setLoad(!load )} convo={conversation}>
        {/* <ChatArea closeChat={() => setChatModeBack(true)}/> */}
      </ContactList>
      
    </div>
  )
}

