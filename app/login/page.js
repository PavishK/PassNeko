"use client";

import { useState } from "react";
import SignUp from '../signup/page.js';
import axios from "axios";
import { set } from "@/services/store";
import {toast} from 'react-hot-toast';
import Loading from "@/components/Loading.js";


export default function Login({closePopup}) {

    const [toggleForm,setToggleForm]=useState(false);

    const [loginData,setLoginData]=useState({email:'',password:''});
    const [showPassword,setShowPassword]=useState(false);

    const [makeLoading,setMakeLoading]=useState(false);

    const onInputChange=(e)=>{
        setLoginData({...loginData,[e.target.name]:e.target.value});
    }

    const onLoginFormSubmit=async(e)=>{
        e.preventDefault();
        setMakeLoading(true);
        try {
            const res=await axios.post('/api/login',loginData);
            set(res.data.token);
            toast.success(res.data.message);
            closePopup();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setMakeLoading(false);
            
        }
    }

    return (
  <>
    <Loading isLoading={makeLoading} />

    {!toggleForm ? (
      <div className="flex items-center justify-normal flex-col gap-y-3 w-full">
        <h1 className="text-2xl font-semibold">Welcome back!</h1>

        <form
          className="flex items-start justify-normal w-full mt-1 flex-col gap-y-2"
          onSubmit={onLoginFormSubmit}
        >
          <div className="flex items-start justify-normal flex-col gap-y-2 w-full">
            <label className="font-semibold uppercase">Email Address</label>
            <input
              className="w-full py-1 rounded-lg text-lg px-2 border-2"
              type="text"
              value={loginData.email}
              name="email"
              onChange={onInputChange}
              autoComplete="username"
            />
          </div>

          <div className="flex items-start justify-normal flex-col gap-y-2 w-full mt-2">
            <label className="font-semibold uppercase">Password</label>
            <input
              className="w-full py-1 rounded-lg text-lg px-2 border-2"
              type={showPassword ? "text" : "password"}
              value={loginData.password}
              name="password"
              onChange={onInputChange}
              autoComplete="current-password"
            />
          </div>

          <div className="flex items-center justify-normal gap-x-1 px-0.5">
            <input
              type="checkbox"
              className="scale-105 accent-black"
              value={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            <label>Show password</label>
          </div>

          <div className="cursor-pointer self-center bg-black w-full py-2 rounded-lg text-white flex items-center justify-center font-semibold text-lg mt-1.5">
            <button type="submit">Login</button>
          </div>
        </form>

        <p className="cursor-pointer">
          {"Don't have an account?"}
          <span
            className=" font-bold pt-3 hover:text-gray-600"
            onClick={() => setToggleForm(true)}
          >
            {" "}
            Register
          </span>
        </p>
      </div>
    ) : (
      <SignUp toggle={() => setToggleForm(false)} close={closePopup}/>
    )}
  </>
);
}