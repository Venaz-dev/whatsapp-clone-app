import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from "react"
import ContactList from "../components/contact-list/contactlist"


export default function Home() {
  return (
    <div className="app-container">
      <ContactList />
    </div>
  )
}
