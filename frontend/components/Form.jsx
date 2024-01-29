"use client";
import React from 'react'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react"

const Form = ({type}) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
        const router = useRouter();
        const onSubmit = async (data) => {
            if (type === "register") {
              const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              });
        
              if (res.ok) {
                console.log("Account created successfully");
                toast.success("Account created successfully");
                router.push("/");
              }
        
              if (res.error) {
                toast.error("Something went wrong");
              }
            }
        
            if (type === "login") {
              const res = await signIn("credentials", {
                ...data,
                redirect: false,
              })
        
              if (res.ok) {
                router.push("/chats");
              }
        
              if (res.error) {
                toast.error("Invalid email or password");
              }
            }
          };
  return (
    <div className='flex flex-col items-center justify-center m-20' onSubmit={handleSubmit(onSubmit)} >
      <div></div>
      <form className="bg-white p-8 rounded shadow-md w-96" >
          {type === "register" && (
            <div>
              <div className="input">
                <input
                  defaultValue=""
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
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>
          )}

          <div>
            <div className="input">
              <input
                defaultValue=""
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Email"
                className="mt-1 p-2 w-full border rounded-md"              />
            </div>
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <div className="input">
              <input
                defaultValue=""
                {...register("password", {
                  required: "Password is required",
                  validate: (value) => {
                    if (
                      value.length < 5 ||
                      !value.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/)
                    ) {
                      return "Password must be at least 5 characters and contain at least one special character";
                    }
                  },
                })}
                type="password"
                placeholder="Password"
                className="mt-1 p-2 w-full border rounded-md"  />
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button  type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            {type === "register" ? "Join now" : "Let's Chat"}
          </button>
        </form>
        {type === "register" ? (
            <Link href="/" className="link">
            <p className="text-center mt-10 font-semibold">Already have an account? Sign In Here</p>
          </Link>
            
            
          ) : (
            <Link href="/register" className="link">
              <p className="text-center mt-10 font-semibold">Don't have an account? Register Here</p>
            </Link>
          )}
    </div>
  )
}

export default Form
