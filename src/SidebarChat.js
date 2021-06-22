import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
const SidebarChat = (props) => {
  return (
    <>
      {props.users.map((v) => {
        return (
          <>
            <div
              onClick={() => {
                props.onChangeChatUser(v);
              }}
              className="SidebarChat"
            >
              <Avatar></Avatar>
              <div className="sidebarChat__info">
                <h2>{v.name}</h2>
                <p>{v.email}</p>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default SidebarChat;
