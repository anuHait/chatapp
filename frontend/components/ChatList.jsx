"use client";

import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";
import Loader from './Loader'
import ChatBox from "./ChatBox";
const ChatList = () => {
    const { data: sessions } = useSession();
  const currentUser = sessions?.user;

  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");
   const getChats = async () => {
    try {
      const res = await fetch(`/api/users/${currentUser._id}`);
      const data=await res.json();
      setChats(data);
      setLoading(false);
    } catch (error) {
      console.log(err);
    }
   };
   console.log(chats);
   useEffect(() => {
    if (currentUser) 
    {getChats();}
   }, [currentUser]);
  return (
    <div>
    
     {
         loading ? <Loader/> : ( <div className="chat-list">
         <input
           placeholder="Search chat..."
           className="input-search"
           value={search}
           onChange={(e) => setSearch(e.target.value)}
         />
   
         <div className="chats">
           {chats?.map((chat, index) => (
             <ChatBox
                key={index}
                chat={chat}
                currentUser={currentUser}
                search={search}
             />
           ))}
         </div>
       </div>)
           } 
    </div>
  )
}

export default ChatList
