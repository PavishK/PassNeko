"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function AddData({newWallet}) {

    const [newData,setNewData]=useState({url:"",username:"",password:""});
    const [showPassword,setShowPassword]=useState(false);

    const validUrl=()=>{
        try {
            new URL(newData.url);
            return true;
        } catch (error) {
            return false;
        }
    }
    
    const onHandleChange=(e)=>{
        setNewData({...newData,[e.target.name]:e.target.value});
    }

    const onSubmitData=(e)=>{
        e.preventDefault();
        

        if(!newData.url || !newData.username || !newData.password){
            toast.error("Fill out the fields!");
            return;
        }

        else if(!validUrl()){
            toast.error("Invalid URL format!");
            return;
        }

        else{
            newWallet(newData);
        }
    }

    return (
       <div className="flex items-center justify-normal flex-col gap-y-3 w-full">
        <h1 className="text-2xl font-semibold">Add new data</h1>

        <form
          className="flex items-start justify-normal w-full mt-1 flex-col gap-y-2"
         onSubmit={onSubmitData}
        >
          <div className="flex items-start justify-normal flex-col gap-y-2 w-full">
            <label className="font-semibold uppercase">URL</label>
            <input
              className="w-full py-1 rounded-lg text-lg px-2 border-2"
              type="url"
              value={newData.url}
              name="url"
              onChange={onHandleChange}
            />
          </div>

          <div className="flex items-start justify-normal flex-col gap-y-2 w-full mt-2">
            <label className="font-semibold uppercase">Username</label>
            <input
              className="w-full py-1 rounded-lg text-lg px-2 border-2"
              type={"text"}
              value={newData.username}
              name="username"
              onChange={onHandleChange}
              autoComplete="username"
            />
          </div>

          <div className="flex items-start justify-normal flex-col gap-y-2 w-full mt-2">
            <label className="font-semibold uppercase">Password</label>
            <input
              className="w-full py-1 rounded-lg text-lg px-2 border-2"
              type={showPassword?"text":"password"}
              value={newData.password}
              name="password"
              onChange={onHandleChange}
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

          <div type="submit" className="cursor-pointer self-center bg-black w-full py-2 rounded-lg text-white flex items-center justify-center font-semibold text-lg mt-1.5">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    );
}