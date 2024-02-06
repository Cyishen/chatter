"use client"


import { Telegram, PeopleRounded } from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomBar = () => {
  const pathname = usePathname();

  return (
    <div className="bottom-bar p-2">
      <div className="flex flex-col items-center text-center">
          <img 
            src="/assets/home.svg" 
            alt="home-icon" 
            width={25} 
            height={25} 
          />
          <p className="text-base-light text-[#737373]">Home</p>
      </div>

      <div className={`${ pathname === "/chats" ? "text-black rounded-[10px] bg-gray-100" : "text-[#737373]" } flex flex-col items-center text-center`}>
          <Link
            href="/"
            className="p-1"
          >
            <Telegram 
              sx={{ color: "#737373", fontSize: 25}} 
              className={`${ pathname === "/chats" ? "text-black" : "text-[#737373]" }`}
            />
            <p className="text-base-light">Chat</p>
          </Link>
      </div>
      
      <div className={`${ pathname === "/contacts" ? "text-black rounded-[10px] bg-gray-100" : "text-[#737373]" } flex flex-col items-center text-center`}>
        <Link
          href="/contacts"
          className="p-1"
        >
          <PeopleRounded 
            sx={{ color: "#737373", fontSize: 25}} 
            className={`${ pathname === "/contacts" ? "text-black" : "text-[#737373]" }`}
          />
          <p className="text-base-light">Add</p>
        </Link>
      </div>
    </div>
  );
};

export default BottomBar;
