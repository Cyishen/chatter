"use client"

import React, { useEffect, useRef, useState } from 'react'
import Link from "next/link";
import Loader from './Loader';
import { useSession } from 'next-auth/react';

import { AddPhotoAlternate } from "@mui/icons-material";
import { CldUploadButton } from "next-cloudinary";
import MessageBox from './MessageBox';
import { pusherClient } from '@lib/pusher';

const ChatDetails = ( {chatId} ) => {
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState({});
  const [otherMembers, setOtherMembers] = useState([]);

  const { data: session } = useSession();
  const currentUser = session?.user;

  const [text, setText] = useState("");
  const bottomRef = useRef(null)

  const getChatDetails = async () => {
    try {
      const res = await fetch(`/api/chats/${chatId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!res.ok) {
        throw new Error(`Request failed with status: ${res.status}`);
      }
      
      const data = await res.json();
      setChat(data);

      setOtherMembers(
        data?.members?.filter((member) => member._id !== currentUser._id)
      );

      setLoading(false);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser && chatId) getChatDetails();
  }, [currentUser, chatId]);

  const sendText = async () => {
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId,
          currentUserId: currentUser._id,
          text,
        }),
      });

      if (res.ok) {
        setText("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendPhoto = async (result) => {
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId,
          currentUserId: currentUser._id,
          photo: result?.info?.secure_url,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  // real time reload
  useEffect(() => {
    pusherClient.subscribe(chatId);

    const handleMessage = async (newMessage) => {
      setChat((prevChat) => {
        return {
          ...prevChat,
          messages: [...prevChat.messages, newMessage],
        };
      });
    };

    pusherClient.bind("new-message", handleMessage);

    return () => {
      pusherClient.unsubscribe(chatId);
      pusherClient.unbind("new-message", handleMessage);
    };
  }, [chatId]);


  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat?.messages]);

  return loading ? (
    <Loader />
  ) : (
    <div className="pb-20 sticky top-24">
      <div className="chat-details">
        <div className="chat-header">
          {chat?.isGroup ? (
            <>
              <Link href={`/chats/${chatId}/group-info`}>
                <img
                  src={chat?.groupPhoto || "/assets/group.png"}
                  alt="group-photo"
                  className="profilePhoto"
                />
              </Link>

              <div className="text w-full">
                <p>
                  {chat?.name || 'Group'} <span className='text-small-medium'>| {chat?.members?.length}{" "}members</span>
                </p>
                <div className='flex items-center h-10 gap-1'>
                  {chat && chat.members.map( (image, index) => (
                    <Link 
                      href={`/profile/${image._id}`} 
                      key={index}
                    >
                      <img 
                        src={image.profileImage || "/assets/person.jpg"}
                        alt='image'
                        height={35}
                        width={35}
                        className='rounded-full object-cover'
                        style={{ width: '35px', height: '35px' }}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <Link href={`/profile/${otherMembers[0]._id}`} >
                <img
                  src={otherMembers[0].profileImage || "/assets/person.jpg"}
                  alt="profile photo"
                  className="profilePhoto"
                />
              </Link>

              <div className="text">
                <p>{otherMembers[0].username}</p>
              </div>
            </>
          )}
        </div>

        <div className="chat-body">
          {chat?.messages?.map((message, index) => (
            <MessageBox
              key={index}
              message={message}
              currentUser={currentUser}
            />
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="send-message">
          <div className="prepare-message">
            <CldUploadButton
              options={{ maxFiles: 1 }}
              onUpload={sendPhoto}
              uploadPreset="pynmmnkw"
            >
              <AddPhotoAlternate
                sx={{
                  fontSize: "35px",
                  cursor: "pointer",
                  "&:hover": { color: "#04A1E3" },
                }}
              />
            </CldUploadButton>

            <input
              type="text"
              placeholder="Message"
              className="input-field"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>

          <div onClick={sendText}>
            <img src="/assets/send.svg" alt="send" className="send-icon" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatDetails