import { connectToDB } from "@mongodb"
import User from "@models/User";

export const GET=async(req,{params})=>{
    try {
        await connectToDB();
        const {userId}=params;
        //finding the chats that the member array includes
        const allChats=await User.find({members:userId})
        .sort({lastMessageAt:-1})
        .populate({
            path: "members",
            model: User,
          })
          .populate({
            path: "messages",
            model: Message,
            populate: {
              path: "sender seenBy",
              model: User,
            },
          })
          .exec();
    
        return new Response(JSON.stringify(allChats), { status: 200 });
    } catch (error) {
        console.log(err);
    return new Response("Failed to get all chats of current user", {
      status: 500,
    });
    }
}