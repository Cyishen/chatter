"use client"


import { SmsOutlined, People, HomeOutlined } from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomBar = () => {
  const pathname = usePathname();

  return (
    <div className="bottom-bar">
      <div className="flex flex-col items-center text-center">
        <div>
          <HomeOutlined 
            sx={{ color: "#737373", }} 
          />
          <p className="text-base-light text-[#737373]">Home</p>
        </div>
      </div>

      <div className={`${ pathname === "/chats" ? "text-black" : "text-[#737373]" } flex flex-col items-center text-center`}>
        <Link
          href="/chats"
        >
          <SmsOutlined 
            sx={{ color: "#737373", }} 
            className={`${ pathname === "/chats" ? "text-black" : "text-[#737373]" }`}
          />
          <p className="text-base-light">Chat</p>
        </Link>
      </div>
      
      <div className={`${ pathname === "/contacts" ? "text-black" : "text-[#737373]" } flex flex-col items-center text-center`}>
        <Link
          href="/contacts"
        >
          <People 
            sx={{ color: "#737373", }} 
            className={`${ pathname === "/contacts" ? "text-black" : "text-[#737373]" }`}
          />
          <p className="text-base-light">Add</p>
        </Link>
      </div>
    </div>
  );
};

export default BottomBar;
