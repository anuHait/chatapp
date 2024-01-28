import { connectToDB } from "@mongodb"
import User from "@models/User";
export const POST=async(req,{params})=>{
   try {
    await connectToDB();
    const {userId}=params;
    const body=await req.json();
    const {username,profileImage}=body;
    const updatedUser= await User.findByIdAndUpdate(userId
        ,{username,profileImage}
        ,{new:true}
        );
        return new Response(JSON.stringify(updatedUser),{
           status:200,
        })
   } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error),{
        status:500,
     })
   }
    }