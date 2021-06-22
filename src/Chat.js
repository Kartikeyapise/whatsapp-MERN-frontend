import React, { useState } from "react";
import "./Chat.css";
import { Avatar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVert from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
// import SelectInput from "@material-ui/core/Select/SelectInput";
import MicIcon from "@material-ui/icons/Mic";
import axios from "./axios";

const Chat = ({ concernedMessages, messages, currentUser, otherUser }) => {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log("in send message");

    console.log({
      message: input,
      name: currentUser.name,
      fromUser: currentUser,
      toUser: otherUser,
    });

    await axios.post("/messages/new", {
      message: input,
      name: currentUser.name,
      fromUser: currentUser._id,
      toUser: otherUser._id,
      // timestamp: new Date().toUTCString(),
      // received: false,
    });
    setInput("");
  };
  return (
    <div className="Chat">
      <div className="chat__header">
        <Avatar></Avatar>
        <div className="chat__headerInfo">
          header info
          <h3>Room name</h3>
          <p>last seen at...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined></SearchOutlined>
          </IconButton>
          <IconButton>
            <AttachFile></AttachFile>
          </IconButton>
          <IconButton>
            <MoreVert></MoreVert>
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {concernedMessages.map((m) => (
          <>
            <p
              className={`chat__message ${
                m.toUser._id == currentUser._id && "chat__receiver"
              }`}
            >
              <span className="chat__name">{m.name}</span>
              {m.message}
              <span className="chat__timestamp">{m.timestamp}</span>
            </p>
          </>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form action="">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              // if (input.length <= 0) {
              //   console.log("input changed else", input.length);
              //   document.getElementById("submitMessageButton").style.display =
              //     "none";
              // } else {
              //   console.log("input changed", input.length);
              //   document.getElementById("submitMessageButton").style.display =
              //     "inline-block";
              // }
              setInput(e.target.value);
            }}
            placeholder="type a message"
          />
          <button id="submitMessageButton" onClick={sendMessage} type="submit">
            send
          </button>
        </form>
        <MicIcon></MicIcon>
      </div>
    </div>
  );
};

export default Chat;
