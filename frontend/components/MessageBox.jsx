import { format } from "date-fns"

const MessageBox = ({ message, currentUser }) => {
  return message?.sender?._id !== currentUser._id ? (
    <div className="flex gap-3 items-start">
      <img src={message?.sender?.profileImage || "/assets/user.png"} alt="profile photo" 
      className="w-10 h-10 rounded-full border-2 p-0.5" />
      <div className="flex flex-col gap-2">
        <p className="text-small-bold">
          {message?.sender?.username} &#160; &#183; &#160; {format(new Date(message?.createdAt), "p")}
        </p>

        {message?.text ? (
          <p className="w-fit bg-white p-3 rounded-lg text-base-medium">{message?.text}</p>
        ) : (
          <img src={message?.photo} alt="message" className="w-40 h-40" />
        )}
      </div>
    </div>
  ) : (
    <div className="flex gap-3 justify-end ">
      <div className="flex flex-col gap-2 items-end  m-4 ">
        <p className="text-small-bold">
          {format(new Date(message?.createdAt), "p")}
        </p>

        {message?.text ? (
          <p className="bg-purple-700  text-white rounded-md  p-3">{message?.text}</p>
        ) : (
          <img src={message?.photo} alt="message" className="w-36 h-36  rounded-md" />
        )}
      </div>
    </div>
  )
}

export default MessageBox