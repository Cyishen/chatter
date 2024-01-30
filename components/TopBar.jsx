"use client";

import { Logout, SmsOutlined, People } from "@mui/icons-material";
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
          <SmsOutlined />
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
          <People />
        </div>
        
        <div className="flex items-center gap-2">
          <Logout
            sx={{ color: "#737373", cursor: "pointer" }}
            onClick={handleLogout}
          />

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
