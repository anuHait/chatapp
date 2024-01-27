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

      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex flex-row justify-between  items-center m-5">
      <Link href="/chats">
        <img src="https://res.cloudinary.com/dcugof3zo/image/upload/v1706384939/chat_b5pual.png" alt="logo" 
        className="w-28 h-28" />
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
            className="w-9 h-9 "
            onClick={handleEditToggle}
          />
      </div>
      {isEditOpen && (
        <div className={`fixed top-0 right-0 bottom-0 left-0 overflow-hidden transition-all duration-300  z-50`}>
          <div className="p-4 bg-gray-200 w-64 h-screen absolute top-0 shadow-sm rounded-lg right-0">
          <div className="flex items-center">
          <FaArrowLeft className="font-semibold text-lg" onClick={handleEditToggle}/>
          <h1 className="text-center font-semibold text-xl m-4">Profile</h1>
          </div>
          loading ? (
            <Loader />
          ) : (
            <div className="profile-page">
              <h1 className="text-heading3-bold">Edit Your Profile</h1>
        
              <form className="edit-profile" onSubmit={handleSubmit(updateUser)}>
                <div className="input">
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
                    className="input-field"
                  />
                </div>
                {error?.username && (
                  <p className="text-red-500">{error.username.message}</p>
                )}
        
                <div className="flex items-center justify-between">
                  <img
                    src={
                      watch("profileImage") ||
                      user?.profileImage ||
                      "/assets/user.png"
                    }
                    alt="profile"
                    className="w-40 h-40 rounded-full"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={uploadPhoto}
                    uploadPreset="upecg01j"
                  >
                    <p className="text-body-bold">Upload new photo</p>
                  </CldUploadButton>
                </div>
        
                <button className="btn" type="submit">
                  Save Changes
                </button>
              </form>
            </div>
          );
          </div>
          
        </div>
      )}
      
    </div>
  );
};

export default TopBar;