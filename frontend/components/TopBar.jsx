"use client";
import Loader from "@components/Loader";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdLogout } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { CldUploadButton } from "next-cloudinary";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPen } from "react-icons/fa";



const TopBar = () => {
  const pathname = usePathname();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const handleEditToggle = () => {
    setIsEditOpen(!isEditOpen);
  };
  const handleLogout = async () => {
    signOut({ callbackUrl: "/" });
  };
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();

  const user = session?.user;
  useEffect(() => {
    if (user) {
      reset({
        username: user?.username,
        profileImage: user?.profileImage,
      });
    }
    setLoading(false);
  }, [user]);

  const {
    register,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { error },
  } = useForm();

  const uploadPhoto = (result) => {
    setValue("profileImage", result?.info?.secure_url);
  }; 

  const updateUser = async (data) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${user._id}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("response after update", res);
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex flex-row justify-between  items-center m-5">
      <Link href="/chats" className="flex gap-2 items-center">
        <img src="https://res.cloudinary.com/dcugof3zo/image/upload/v1706384939/chat_b5pual.png" alt="logo" 
        className="w-28 h-28" />
        <h1 className="text-heading4-bold font-semibold text-3xl">ChatVista</h1>
      </Link>

      <div className="flex items-center flex-row gap-4 m-4">
        <Link
          href="/chats"
          className={`${
            pathname === "/chats" ? "text-red-1" : ""
          } text-heading4-bold font-semibold text-lg`}
        >
          Chats
        </Link>
        <Link
          href="/contacts"
          className={`${
            pathname === "/contacts" ? "text-red-1" : ""
          } text-heading4-bold font-semibold text-lg`}
        >
          Contacts
        </Link>

        <MdLogout  className="font-bold text-lg"
        onClick={handleLogout}/>


        
          <img
            src={user?.profileImage || "/assets/user.png"}
            alt="profile"
            className="w-10 h-10 rounded-full border-2 p-0.5 cursor-pointer"
            onClick={handleEditToggle}
          />
      </div>
      {isEditOpen && (
        <div className={`fixed top-0 right-0 bottom-0 left-0 overflow-hidden transition-all duration-300  z-50`}>
          <div className="p-4 bg-gray-100 w-64 h-screen absolute top-0 shadow-sm rounded-lg right-0">
          <div className="flex items-center justify-center">
          <FaArrowLeft className="font-semibold text-lg" onClick={handleEditToggle}/>
          <h1 className="text-center font-semibold text-xl m-4">Profile</h1>
          </div>
         {loading ? (
            <Loader />
          ) : (
            <div className="profile-page">
        
              <form className="text-center font-semibold" onSubmit={handleSubmit(updateUser)}>
                <div className="flex justify-between items-center">
                  <input
                    {...register("username", {
                      required: "Username is required",
                      validate: (value) => {
                        if (value.length < 3) {
                          return "Username must be at least 3 characters";
                        }
                      },
                    })}
                    type="text"
                    placeholder="Username"
                    className="text-center font-semibold mb-10 bg-blue-2 rounded-lg"
                    
                  />
               

                </div>
                {error?.username && (
                  <p className="text-red-500">{error.username.message}</p>
                )}
        
                <div className="flex flex-col items-center justify-between">
                  <img
                    src={
                      watch("profileImage") ||
                      user?.profileImage ||
                      "/assets/user.png"
                    }
                    alt="profile"
                    className="w-32 h-32 rounded-full border-2 p-0.5"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={uploadPhoto}
                    uploadPreset="kh1wemgx"
                  >
                    <p className="text-body-bold mt-5">Upload new photo</p>
                  </CldUploadButton>
                </div>
        
                <button className="mt-20 bg-blue-500 text-white p-3 rounded-md" type="submit">
                  Save Changes
                </button>
              </form>
            </div>
          )}
          </div>
          
        </div>
      )}
      
    </div>
  );
};

export default TopBar;