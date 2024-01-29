"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useRouter } from "next/navigation";
import { IoMdRadioButtonOff } from "react-icons/io";
import { IoRadioButtonOn } from "react-icons/io5";

const Contacts = () => {
    const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

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
    if (currentUser) getContacts();
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

  return (
    <div>
    {
        loading ? <Loader/> : (
            <div className="">
            <input
            placeholder="Search contact..."
            className="w-full p-2 rounded-lg border-2 border-gray-200 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
            <div className=" flex flex-row gap-12 m-10">
            <div className="w-[70%]">
            <p className="font-semibold text-2xl">Select from your Contacts</p>
            {
                contacts.map((user,index)=>(
                    <div key={index} 
                    className="flex flex-row items-center gap-2 m-6 text-lg font-semibold"
                    onClick={()=>handleSelect(user)}> 
                    {selectedContacts.find((item) => item === user) ? (
                        <IoRadioButtonOn  className="text-blue-600"/>

                      ) : (
                        <IoMdRadioButtonOff />
                      )}
                    
                    <img
                  src={user.profileImage || "/assets/user.png"}
                  alt="profile"
                  className="w-12 h-12 rounded-full border-2 p-0.5"
                />
                <p className="text-base-bold">{user.username}</p>
                    </div>
                ))
            }
            </div>
            {/*button to start new chats */}
            <div>
            {
                selectedContacts.length>1 &&(
                    <>
                    <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-3">
                <p className="text-lg font-semibold">  Group Chat Name</p>
                <input
                  placeholder="Enter group chat name..."
                  className="p-2 border-2 border-gray-200 rounded-lg outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-lg font-semibold">Selected Members</p>
                <div className="flex flex-wrap gap-3">
                  {selectedContacts.map((contact, index) => (
                    <p className="rounded-md shadow-md text-md text-white font-semibold p-2 bg-purple-300" key={index}>
                      {contact.username}
                    </p>
                  ))}
                </div>
              </div>
                    </div>
                    </>
                )
            }
            <button className="bg-blue-500 rounded-md text-white mt-7 p-3 font-semibold"
            onClick={createChat}>Find or  Start a new Conversation</button>
            </div>
            </div>
            </div>
            )
    }
    
    </div>
  )
}

export default Contacts
