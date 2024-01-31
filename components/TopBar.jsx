"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";


const TopBar = () => {
  const pathname = usePathname();

  const handleLogout = async () => {
    signOut({ callbackUrl: "/" });
  };

  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="topbar">
      <Link href="/chats">
        <h1 className="text-heading1-bold">Chatter</h1>
      </Link>

      <div className="menu">
        <div className="flex items-center gap-2 max-sm:hidden">
          <Link
            href="/chats"
            className={`${
              pathname === "/chats" ? "text-blue-1" : ""
            } text-heading4-bold`}
          >
            Chats
          </Link>
          <img src="/assets/chat.svg" alt="chat" width={25} height={25}/>
        </div>
        
        <div className="flex items-center gap-2 max-sm:hidden">
          <Link
            href="/contacts"
            className={`${
              pathname === "/contacts" ? "text-blue-1" : ""
            } text-heading4-bold`}
          >
            Contacts
          </Link>
          <img src="/assets/person-3-fill.svg" alt="chat" width={30} height={30}/>
        </div>
        
        <div className="flex items-center gap-2">
          <img src="/assets/logout.svg" alt="chat" width={25} height={25} onClick={handleLogout} className="cursor-pointer hover:invert"/>

          <Link href="/profile">
            <img
              src={user?.profileImage || "/assets/person.jpg"}
              alt="profile"
              className="profilePhoto"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
