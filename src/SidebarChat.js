import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
const SidebarChat = () => {
  return (
    <>
      <div className="SidebarChat">
        <Avatar></Avatar>
        <div className="sidebarChat__info">
          <h2>room name</h2>
          <p>This is the lasyt messsage</p>
        </div>
      </div>
    </>
  );
};

export default SidebarChat;
