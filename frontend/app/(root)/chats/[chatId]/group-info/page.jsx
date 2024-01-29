"use client";

import Loader from "@components/Loader";
import { CldUploadButton } from "next-cloudinary";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import React from 'react'

const page = () => {
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState({});

  const { chatId } = useParams();

  const getChatDetails = async () => {
    try {
      const res = await fetch(`/api/chats/${chatId}`);
      const data = await res.json();
      setChat(data);
      setLoading(false);
      reset({
        name: data?.name,
        groupPhoto: data?.groupPhoto,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (chatId) {
      getChatDetails();
    }
  }, [chatId]);

  const {
    register,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { error },
  } = useForm();

  const uploadPhoto = (result) => {
    setValue("groupPhoto", result?.info?.secure_url);
  };

  const router = useRouter();

  const updateGroupChat = async (data) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/chats/${chatId}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setLoading(false);

      if (res.ok) {
        router.push(`/chats/${chatId}`);
      }

    } catch (error) {
      console.log(error);
    }
  };

return loading ? (
    <Loader />
  ) : (
    <div className="m-3 flex flex-col gap-4 items-center justify-center w-full rounded-md bg-gray-100">
    
      <h1 className="text-2xl font-semibold">Edit Group Info</h1>

      <form className="flex flex-col gap-9" onSubmit={handleSubmit(updateGroupChat)}>
        <div className="input">
          <input
            {...register("name", {
              required: "Group chat name is required",
            })}
            type="text"
            placeholder="Group chat name"
            className="text-center font-semibold mb-10 bg-blue-2 rounded-lg"
          />
         
        </div>
        {error?.name && <p className="text-red-500">{error.name.message}</p>}

        <div className="flex flex-col items-center justify-between">
          <img
            src={watch("groupPhoto") || "/assets/team.png"}
            alt="profile"
            className="w-40 h-40 rounded-full border-2 p-0.5"
          />
          <CldUploadButton
          options={{ maxFiles: 1 }}
          onUpload={uploadPhoto}
          uploadPreset="kh1wemgx"
        >
            <p className="text-body-bold mt-5">Upload new photo</p>
          </CldUploadButton>
        </div>
          <h1 className="text-bold text-2xl">Members in the group</h1>
        <div className="flex flex-wrap gap-3 text-2xl font-semibold">
          {chat?.members?.map((member, index) => (
            <p className="rounded-md shadow-md text-md text-white font-semibold p-2 bg-purple-300" key={index}>{member.username}</p>
          ))}
        </div>

        <button className="mt-2 bg-blue-500 text-white p-3 rounded-md" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default page
