import React from 'react'
import { BsFillPeopleFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

const ChatBox = ({chat,currentUser,currentChatId}) => {
  const otherMembers = chat?.members?.filter(
    (member) => member._id !== currentUser._id
  );

  const lastMessage =
    chat?.messages?.length > 0 && chat?.messages[chat?.messages.length - 1];

  const seen = lastMessage?.seenBy?.find(
    (member) => member._id === currentUser._id
  );

  const router = useRouter();

  return (
    <div className={`rounded-lg p-7 ${chat?._id === currentChatId && "bg-gray-100"}`}
    onClick={() => router.push(`/chats/${chat._id}`)}>
      <div className={`flex items-center flex-row justify-between`}>
      <div className='flex items-center flex-row gap-3 '>
      {chat?.isGroup ? (
        <img
          src={chat?.groupPhoto || <BsFillPeopleFill className='text-gray-400'/>}
          alt="group-photo"
          className="w-16 h-16 rounded-full border-2 p-0.5"

        />
      ) : (
        <img
          src={otherMembers[0].profileImage || "/assets/person.jpg"}
          alt="profile-photo"
          className="w-16 h-16 rounded-full border-2 p-0.5"

        />
      )}
      <div className="flex flex-col gap-1">
          {chat?.isGroup ? (
            <p className="font-semibold">{chat?.name}</p>
          ) : (
            <p className="font-semibold">{otherMembers[0]?.username}</p>
          )}

          {!lastMessage && <p className="text-small-bold">Started a chat</p>}

          {lastMessage?.photo ? (
            lastMessage?.sender?._id === currentUser._id ? (
              <p className="text-small-medium text-grey-3">You sent a photo</p>
            ) : (
              <p
                className={`${
                  seen ? "text-small-medium text-grey-3" : "text-small-bold"
                }`}
              >
                Received a photo
              </p>
            )
          ) : (
            <p
              className={`last-message ${
                seen ? "text-small-medium text-grey-3" : "text-small-bold"
              }`}
            >
              {lastMessage?.text}
            </p>
          )}
        </div>
        </div>
        <div>
        <p className="text-base-light text-grey-3">
          {!lastMessage
            ? format(new Date(chat?.createdAt), "p")
            : format(new Date(chat?.lastMessageAt), "p")}
        </p>
      </div>
      </div>
      
    </div>
  )
}

export default ChatBox
