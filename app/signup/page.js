"use client";

import Loading from "@/components/Loading";
import { set } from "@/services/store";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";


export default function SignUp({toggle, close}) {

    const [registerData,setRegisterData]=useState({email:'',password:'',confirm_password:''});
    const [showPassword,setShowPassword]=useState(false);

    const [makeLoading,setMakeLoading]=useState(false);

    const onInputChange=(e)=>{
        setRegisterData({...registerData,[e.target.name]:e.target.value});
    }

    const onSubmitHandler=async(e)=>{
        e.preventDefault()
        setMakeLoading(true);
        try {
            const res=await axios.post("/api/signup",registerData);
            set(res.data.token);
            toast.success(res.data.message);
            close();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setMakeLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-normal flex-col gap-y-3 w-full">
            <h1 className="text-2xl font-semibold">Create an account</h1>

            <form className="flex items-start justify-normal w-full mt-1 flex-col gap-y-2" onSubmit={onSubmitHandler}>

                <div className="flex items-start justify-normal flex-col gap-y-2 w-full">
                    <label className="font-semibold uppercase">Email Address</label>
                    <input className="w-full py-1 rounded-lg text-lg px-2 border-2" type="text" value={registerData.email} name="email" onChange={onInputChange}/>
                </div>

                <div className="flex items-start justify-normal flex-col gap-y-2 w-full mt-2">
                    <label className="font-semibold uppercase">Password</label>
                    <input className="w-full py-1 rounded-lg text-lg px-2 border-2" type={showPassword?'text':'password'} value={registerData.password} name="password" onChange={onInputChange}/>
                </div>

                <div className="flex items-start justify-normal flex-col gap-y-2 w-full mt-2">
                    <label className="font-semibold uppercase">Confirm Password</label>
                    <input className="w-full py-1 rounded-lg text-lg px-2 border-2" type={showPassword?'text':'password'} value={registerData.confirm_password} name="confirm_password" onChange={onInputChange}/>
                </div>

                <div className="flex items-center justify-normal gap-x-1 px-0.5">
                    <input type="checkbox" className="scale-105 accent-black" value={showPassword} onChange={(e)=>setShowPassword(e.target.checked)}/>
                    <label>Show password</label>
                </div>

                <div className="cursor-pointer self-center bg-black w-full py-2 rounded-lg text-white flex items-center justify-center font-semibold text-lg mt-1.5">
                    <button type="submit">Register</button>
                </div>
            </form>
            <p className="cursor-pointer">Already have an account?<span className=" font-bold pt-3 hover:text-gray-600" onClick={()=>toggle()}> Login</span></p>
        <Loading isLoading={makeLoading}/>
        </div>
    );
}