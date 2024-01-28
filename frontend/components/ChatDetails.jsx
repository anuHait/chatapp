import React,{useState,useEffect} from 'react'
import Loader from './Loader'
import { useSession } from "next-auth/react";
import Link from "next/link";
import { CldUploadButton } from "next-cloudinary";
import { IoSend } from "react-icons/io5";

const ChatDetails = ({chatId}) => {
    const [loading,setLoading]=useState(true);
    const [chat, setChat] = useState({});
  const [otherMembers, setOtherMembers] = useState([]);

  const { data: session } = useSession();
  const currentUser = session?.user;

  const [text, setText] = useState("");
    const getChatDetails = async () => {
        try {
          const res = await fetch(`/api/chats/${chatId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
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
      const sendText=async()=>{

      }
  return (
    
        loading ? <Loader />: (
            <div className=''>
            {/*Chat header */}
            <div className='flex items-center gap-3 bg-white p-2 rounded-md'>
            {chat?.isGroup?(
                <>
                <Link href={`/chats/${chatId}/group-info`}>
                  <img
                    src={chat?.groupPhoto || "/assets/group.png"}
                    alt="group-photo"
                    className="w-16 h-16 rounded-full border-2 p-0.5"
                  />
                </Link>
  
                <div className="text">
                  <p>
                    {chat?.name} {chat?.members?.length}{" "}
                    members
                  </p>
                </div>
              </>
            ):(
                <>
              <img
                src={otherMembers[0].profileImage || "/assets/person.jpg"}
                alt="profile photo"
                className="w-16 h-16 rounded-full border-2 p-0.5"
              />
              <div className="text">
                <p>{otherMembers[0].username}</p>
              </div>
            </> 
            )}
            </div>
            {/*Chat body */}
            <div></div>
            {/*Send Message*/}
            <div>
            <div className="send-message">
            <div className="flex flex-row items-center shadow-md rounded-md bg-white mt-6 ">
              <input
                type="text"
                placeholder="Write a message..."
                className="p-3 w-[95%] rounded-lg  outline-none"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
           
  
            <div onClick={sendText}>
            <IoSend className='text-gray-700 text-2xl'/>
            </div>
            </div>
          </div>
            </div>
            </div>

        )
  )
}

export default ChatDetails