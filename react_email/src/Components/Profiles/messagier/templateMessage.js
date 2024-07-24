/* eslint-disable no-unused-vars */

/*----------------------------------------------------------------




User Story

Title: Chat Application Layout

As a user
I want a chat application layout with three distinct parts:

    A header that displays the selected user's name, profile image, and online status.
    A main section for all sent and received messages.
    A footer for message input and sending.

So that I can have an organized and clear interface for my chat interactions.

Story Points: 5

Acceptance Criteria:

    The header should display the name of the selected user, their profile image, and indicate if they are online or offline.
    The main section should display all sent and received messages in a scrollable view.
    The footer should have an input field for typing messages and a button for sending messages.
    The layout should be responsive and adapt to different screen sizes.   
 */
 

/* data ={
email,image
} */
import styles from './templateMessage.module.css';
import React, { useState } from 'react';    

const ContentChat = ({ data }) => {
    return (
      <div className={styles.chatContainer}>
        <header className={styles.messageHeader}>
          <img src={data.image} alt="profile" />
          <h1 className={styles.nameHeader}>{data.email.substring(0, 8)}</h1>
          <div className={styles.active}></div>
        </header>
        <main className={styles.messageMain}>
          {/* Add chat messages here */}
        </main>
        <footer className={styles.chatFooter}>
          <input
            className={styles.chatInput}
            placeholder="Enter your message"
            type="text"
          />
          <button className={styles.sendButton} type="submit">
            Send
          </button>
        </footer>
      </div>
    );
  };
  
  export default ContentChat;