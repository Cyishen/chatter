"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

const Contacts = () => {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false)

  const { data: session } = useSession();
  const currentUser = session?.user;

  const getContacts = async () => {
    try {
      const res = await fetch(
        search !== "" ? `/api/users/searchContact/${search}` : "/api/users"
      );
      const data = await res.json();
      setContacts(data.filter((contact) => contact._id !== currentUser._id));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getContacts()
    }
  }, [currentUser, search]);

  /* SELECT CONTACT */
  const [selectedContacts, setSelectedContacts] = useState([]);
  const isGroup = selectedContacts.length > 1;

  const handleSelect = (contact) => {
    if (selectedContacts.includes(contact)) {
      setSelectedContacts((prevSelectedContacts) =>
        prevSelectedContacts.filter((item) => item !== contact)
      );
    } else {
      setSelectedContacts((prevSelectedContacts) => [
        ...prevSelectedContacts,
        contact,
      ]);
    }
  };

  /* ADD GROUP CHAT NAME */
  const [name, setName] = useState("");

  const router = useRouter();

  /* CREATE CHAT */
  const createChat = async () => {
    const res = await fetch("/api/chats", {
      method: "POST",
      body: JSON.stringify({
        currentUserId: currentUser._id,
        members: selectedContacts.map((contact) => contact._id),
        isGroup,
        name,
      }),
    });
    const chat = await res.json();

    if (res.ok) {
      router.push(`/chats/${chat._id}`);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="create-chat-container">
      <input
        placeholder="Search username"
        className="input-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="contact-bar">
        <div className="contact-list">
          <div className="flex justify-between items-center">
            <p className="text-body-bold">Select</p>
            <IconButton
              aria-label="open-group"
              size="medium"
              color="secondary" 
              variant="contained"
              onClick={ ()=>setOpen(!open) }

            >
              <img src="/assets/person-3-fill.svg" alt="group" width={25} height={25} />
            </IconButton>
          </div>

          <div className="flex flex-col flex-1 overflow-y-scroll custom-scrollbar">
            {contacts.map((user, index) => (
              <div
                key={index}
                className="contact justify-between hover:bg-grey-2 rounded-lg p-2"
                onClick={() => handleSelect(user)}
              >
                <div className="contact">
                  <Link href={`/profile/${user._id}`}>
                    <img
                      src={user.profileImage || "/assets/person.jpg"}
                      alt="profile"
                      className="profilePhoto"
                    />
                  </Link>

                  <p className="text-base-bold">{user.username}</p>
                </div>

                <div className="flex gap-1 items-center">
                  {open === true ? (
                    <>
                      {selectedContacts.find((item) => item === user) ? (
                        <CheckCircle sx={{ color: "green" }} />
                      ) : (
                        <RadioButtonUnchecked />
                      )}
                    </>
                  ) : (
                    <Button 
                      variant="contained" 
                      onClick={createChat} 
                      className="bg-black font-bold">
                      Chat
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="create-chat">
          {isGroup && (
            <>
              <div className="flex flex-col gap-3">
                <p className="text-body-bold">Group Chat Name</p>
                <input
                  placeholder="Enter group chat name..."
                  className="input-group-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-body-bold">Members</p>
                <div className="flex flex-wrap gap-3">
                  {selectedContacts.map((contact, index) => (
                    <p className="selected-contact" key={index}>
                      {contact.username}
                    </p>
                  ))}
                </div>
              </div>

              <Button
                className="btn"
                variant="contained"
                onClick={createChat}
                disabled={selectedContacts.length === 0}
              >
                START A NEW CHAT
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
