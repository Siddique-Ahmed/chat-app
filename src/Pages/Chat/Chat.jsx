import React, { useContext, useEffect, useState } from "react";
import "./Chat.css";
import LeftSideBar from "../../Components/LeftSideBar/LeftSideBar";
import ChatBox from "../../Components/ChatBox/ChatBox";
import RightSideBar from "../../Components/RightSideBar/RightSideBar";
import { AppContext } from "../../context/AppContext";

const Chat = () => {
  const { chatData, userData } = useContext(AppContext);
  const [loading, setLoading] = useState(true);


  useEffect(()=>{
    if(chatData && userData){
      setLoading(false)
    }else{
      setLoading(true)
    }

  },[chatData,userData])




  return (
    <div className="chat">
      {loading ? (
        <p className="noChat">Loading...</p>
      ) : (
        <div className="chat-container">
          <LeftSideBar />
          <ChatBox />
          <RightSideBar />
        </div>
      )}
    </div>
  );
};

export default Chat;
