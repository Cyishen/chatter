"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ChatBox from "./ChatBox";
import Loader from "./Loader";
import { pusherClient } from "@lib/pusher";

const ChatList = ({ currentChatId }) => {
  const { data: sessions } = useSession();
  const currentUser = sessions?.user;

  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");

  const getChats = async () => {
    try {
      const res = await fetch(
        search !== ""
          ? `/api/users/${currentUser._id}/searchChat/${search}`
          : `/api/users/${currentUser._id}`
      );
      const data = await res.json();
      setChats(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getChats();
    }
  }, [currentUser, search]);

  useEffect(() => {
    if (currentUser) {
      pusherClient.subscribe(currentUser._id);

      const handleChatUpdate = (updatedChat) => {
        setChats((allChats) =>
          allChats.map((chat) => {
            if (chat._id === updatedChat.id) {
              return { ...chat, messages: updatedChat.messages };
            } else {
              return chat;
            }
          })
        );
      };

      const handleNewChat = (newChat) => {
        setChats((allChats) => [...allChats, newChat]);
      }

      pusherClient.bind("update-chat", handleChatUpdate);
      pusherClient.bind("new-chat", handleNewChat);

      return () => {
        pusherClient.unsubscribe(currentUser._id);
        pusherClient.unbind("update-chat", handleChatUpdate);
        pusherClient.unbind("new-chat", handleNewChat);
      };
    }
  }, [currentUser]);

  return !currentUser ? (
    <div className="not-logged-in">
      <p className="flex justify-center items-center h-20 bg-white rounded-2xl mb-5">
        Login to chats
      </p>

      <div className="flex flex-col gap-5">
        <img src="/assets/chatImg.png"/>

        <video 
          autoPlay 
          muted 
          loop
          playsInline={true} 
          className='pointer-events-none'
        >
          <source src="/assets/chatVideo.mov" type='video/mp4'/>
        </video>
      </div>
    </div>
  ) : loading ? (
    <Loader />
  ) : (
    <div className="chat-list">
      <input
        placeholder="Search title"
        className="input-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {chats.length === 0 ? (
        <div className="chats min-h-[200px] justify-center items-center gap-4">
          <p className="text-base-medium">Let's chat</p>
          <img src="/assets/chat.svg" alt="chat" width={50} height={50}/>
        </div>
      ) : (
        <div className="chats">
          {chats?.map((chat, index) => (
            <ChatBox
              chat={chat}
              key={index}
              currentUser={currentUser}
              currentChatId={currentChatId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatList;
