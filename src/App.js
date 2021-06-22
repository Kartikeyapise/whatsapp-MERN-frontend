import React, { useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { useEffect } from "react";
import Pusher from "pusher-js";
import axios from "./axios";
import auth from "./services/authService";

// import env from "dotenv";
// env.config();
// console.log(process.env);
function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserChat, setCurrentUserChat] = useState({});
  const [messages, setMessages] = useState([]);
  const [concernedMessages, setConcernedMessages] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  // const [chatUsers, setChatUsers] = useState([]);
  // const [messageBody, setMessageBody] = useState([]);

  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      axios.get("/getAllUsers").then((response1) => {
        let messagesSync = response.data;
        setMessages(messagesSync);
        // console.log("response1.data", response1.data);

        // setCurrentUserChat(response1.data[0]);
        let currentUser = auth.getCurrentUser();
        setCurrentUser(currentUser);
        setAllUsers(response1.data.filter((v) => v._id !== currentUser._id));

        // console.log("allUsers", allUsers);
        // console.log("messagesSync", messagesSync);
        // console.log("currentUser", currentUser);
        // console.log("currentUserChat", currentUserChat);
        // let messagesOfCurrentUser = messagesSync.filter((v) => {
        //   if (
        //     (currentUserChat._id == v.toUser._id &&
        //       currentUser._id == v.fromUser._id) ||
        //     (currentUser._id == v.toUser._id &&
        //       currentUserChat._id == v.fromUser._id)
        //   ) {
        //     return true;
        //   } else {
        //     return false;
        //   }
        // });
        // let sortedArray = messagesOfCurrentUser.sort((a, b) =>
        //   a.updatedAt > b.updatedAt ? 1 : -1
        // );
        // console.log("sorted array", sortedArray);
        // setConcernedMessages(sortedArray);

        // let temp1 = sortedArray.map((v) => {
        //   return v.fromUser._id;
        // });
        // let temp2 = sortedArray.map((v) => {
        //   return v.toUser._id;
        // });
        // let temp3 = Array.from(new Set([...temp1, ...temp2]));
        // temp3 = temp3.filter((v) => {
        //   if (v == currentUser._id) return false;
        //   else return true;
        // });
        // console.log("temp3", temp3);
        // let chatUsers = allUsers.filter((v) => {
        //   if (temp3.indexOf(v._id) !== -1) return true;
        //   else return false;
        // });
        // setChatUsers([...chatUsers]);
      });
    });
  }, []);
  useEffect(() => {
    // Enable pusher logging - don't include this in production
    // console.log("pusher info::");
    // Pusher.logToConsole = true;
    const pusher = new Pusher("fbe55a9d3a0f0d0df65e", {
      cluster: "ap2",
    });
    var channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      // alert(JSON.stringify(newMessage));
      // console.log(newMessage);
      let updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      // setCurrentUserChat(v);
      let messagesOfCurrentUser = updatedMessages.filter((v) => {
        if (
          (currentUserChat._id == v.toUser._id &&
            currentUser._id == v.fromUser._id) ||
          (currentUser._id == v.toUser._id &&
            currentUserChat._id == v.fromUser._id)
        ) {
          return true;
        } else {
          return false;
        }
      });
      let sortedArray = messagesOfCurrentUser.sort((a, b) =>
        a.updatedAt > b.updatedAt ? 1 : -1
      );
      console.log("sorted array", sortedArray);
      setConcernedMessages([...sortedArray]);
      console.log(sortedArray);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  // console.log("currentUser", currentUser);
  // console.log("currentUserChat", currentUserChat);
  // console.log("messages", messages);
  // console.log("concernedMessages", concernedMessages);
  // console.log("allUsers", allUsers);
  function onChangeChatUser(v) {
    console.log(v);
    setCurrentUserChat(v);
    let messagesOfCurrentUser = messages.filter((v) => {
      if (
        (currentUserChat._id == v.toUser._id &&
          currentUser._id == v.fromUser._id) ||
        (currentUser._id == v.toUser._id &&
          currentUserChat._id == v.fromUser._id)
      ) {
        return true;
      } else {
        return false;
      }
    });
    let sortedArray = messagesOfCurrentUser.sort((a, b) =>
      a.updatedAt > b.updatedAt ? 1 : -1
    );
    console.log("sorted array", sortedArray);
    setConcernedMessages(sortedArray);
  }
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar
          otherUser={currentUserChat}
          currentUser={currentUser}
          users={allUsers}
          onChangeChatUser={onChangeChatUser}
        ></Sidebar>
        <Chat
          otherUser={currentUserChat}
          messages={messages}
          concernedMessages={concernedMessages}
          currentUser={currentUser}
        ></Chat>
      </div>
    </div>
  );
}

export default App;
