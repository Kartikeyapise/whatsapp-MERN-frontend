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

const Chat = ({ messages }) => {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log("in send message");
    await axios.post("/messages/new", {
      message: input,
      name: "demo",
      timestamp: new Date().toUTCString(),
      received: false,
    });
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
        {messages.map((message) => (
          <>
            <p
              className={`chat__message ${
                message.received && "chat__receiver"
              }`}
            >
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">{message.timestamp}</span>
            </p>
          </>
        ))}

        {/* <p className="chat__message">
          <span className="chat__name">sonny</span>
          this is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>

        <p className="chat__message chat__receiver">
          <span className="chat__name">sonny</span>
          this is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>

        <p className="chat__message chat__receiver">
          <span className="chat__name">sonny</span>
          this is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>

        <p className="chat__message chat__receiver">
          <span className="chat__name">sonny</span>
          this is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p> */}
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form action="">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              if (input.length <= 0) {
                console.log("input changed else", input.length);
                document.getElementById("submitMessageButton").style.display =
                  "none";
              } else {
                console.log("input changed", input.length);
                document.getElementById("submitMessageButton").style.display =
                  "inline-block";
              }
              setInput(e.target.value);
            }}
            placeholder="type a message"
          />
          <button id="submitMessageButton" onClick={sendMessage} type="submit">
            send a message
          </button>
        </form>
        <MicIcon></MicIcon>
      </div>
    </div>
  );
};

export default Chat;
