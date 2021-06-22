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
  const [state, setState] = useState({
    currentUser: {},
    currentUserChat: {},
    messages: [],
    concernedMessages: [],
    allUsers: [],
  });

  // const [currentUser, setCurrentUser] = useState({});
  // const [currentUserChat, setCurrentUserChat] = useState({});
  // const [messages, setMessages] = useState([]);
  // const [concernedMessages, setConcernedMessages] = useState([]);
  // const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      axios.get("/getAllUsers").then((response1) => {
        let messagesSync = response.data;
        // setState({ ...state, messages: messagesSync });
        // console.log("response1.data", response1.data);

        let currentUser = auth.getCurrentUser();
        let allUsers = response1.data.filter((v) => v._id !== currentUser._id);
        console.log("messagesSync", messagesSync);
        setState({
          ...state,
          messages: messagesSync,
          currentUser: currentUser,
          allUsers: allUsers,
        });

        // setAllUsers(response1.data.filter((v) => v._id !== currentUser._id));

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
    var element = document.getElementById("chat__body");
    element.scrollTop = element.scrollHeight;
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
      let updatedMessages = [...state.messages, newMessage];
      // setMessages(updatedMessages);
      // setCurrentUserChat(v);
      let messagesOfCurrentUser = updatedMessages.filter((v) => {
        if (
          (state.currentUserChat._id == v.toUser._id &&
            state.currentUser._id == v.fromUser._id) ||
          (state.currentUser._id == v.toUser._id &&
            state.currentUserChat._id == v.fromUser._id)
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
      setState({
        ...state,
        messages: updatedMessages,
        concernedMessages: [...sortedArray],
      });

      // setConcernedMessages([...sortedArray]);
      console.log(sortedArray);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [state]);

  // console.log("currentUser", currentUser);
  // console.log("currentUserChat", currentUserChat);
  // console.log("messages", messages);
  // console.log("concernedMessages", concernedMessages);
  // console.log("allUsers", allUsers);
  function onChangeChatUser(v) {
    console.log(v);
    let currentUserChat = v;
    // setState({...state,currentUserChat:v});
    // setCurrentUserChat(v);
    console.log("state.messages", state.messages);
    let messagesOfCurrentUser = state.messages.filter((vf) => {
      if (
        (currentUserChat._id == vf.toUser._id &&
          state.currentUser._id == vf.fromUser._id) ||
        (state.currentUser._id == vf.toUser._id &&
          currentUserChat._id == vf.fromUser._id)
      ) {
        return true;
      } else {
        return false;
      }
    });
    let sortedArray = messagesOfCurrentUser.sort((a, b) =>
      a.updatedAt > b.updatedAt ? 1 : -1
    );
    console.log("sortedArray", sortedArray);

    console.log("sorted array", sortedArray);
    setState({
      ...state,
      concernedMessages: sortedArray,
      currentUserChat: currentUserChat,
    });

    // setConcernedMessages(sortedArray);
  }
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar
          otherUser={state.currentUserChat}
          currentUser={state.currentUser}
          users={state.allUsers}
          onChangeChatUser={onChangeChatUser}
        ></Sidebar>
        <Chat
          otherUser={state.currentUserChat}
          messages={state.messages}
          concernedMessages={state.concernedMessages}
          currentUser={state.currentUser}
        ></Chat>
      </div>
    </div>
  );
}

export default App;
